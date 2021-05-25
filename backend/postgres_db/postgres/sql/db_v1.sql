BEGIN;

/* CLEANUP */

DROP TABLE IF EXISTS account      CASCADE;
DROP TABLE IF EXISTS post         CASCADE;
DROP TABLE IF EXISTS comment      CASCADE;
DROP TABLE IF EXISTS user_like    CASCADE;
DROP TABLE IF EXISTS e_language   CASCADE;
DROP TABLE IF EXISTS e_category   CASCADE;
DROP TABLE IF EXISTS has_category CASCADE;


/* Create Domains */

/* from https://gitlab.multimedia.hs-augsburg.de/kowa/wk_account_postgres_01a.git */
CREATE DOMAIN D_UNTAINTED
AS VARCHAR (25) CHECK (value !~ '[<>"'';]|--|/\*');


/* Create Tables */

/* from https://gitlab.multimedia.hs-augsburg.de/kowa/wk_account_postgres_01a.git */
CREATE TABLE account 
(id                     UUID                PRIMARY KEY DEFAULT gen_random_uuid(),
 username               D_UNTAINTED         UNIQUE NOT NULL,
 password               VARCHAR             NOT NULL,
 profile_picture        BYTEA
);

CREATE TABLE e_language
(id                     UUID                PRIMARY KEY DEFAULT gen_random_uuid(),
 name                   VARCHAR             UNIQUE NOT NULL 
);

CREATE TABLE post
(id                     UUID                              PRIMARY KEY DEFAULT gen_random_uuid(),
 creation_time          TIMESTAMP WITH TIME ZONE          NOT NULL DEFAULT CURRENT_TIMESTAMP,
 title                  VARCHAR (30)                      NOT NULL DEFAULT 'A fancy title',
 content                TEXT                              NOT NULL,
 language_id            UUID                              NOT NULL,
 user_id                UUID                              NOT NULL,

 CONSTRAINT fk_language_id
    FOREIGN KEY (language_id) REFERENCES e_language (id),

 CONSTRAINT fk_user_id
    FOREIGN KEY (user_id)     REFERENCES account (id)

);

/* Create Triggers and Functions */

/* from https://gitlab.multimedia.hs-augsburg.de/kowa/wk_account_postgres_01a.git */
CREATE FUNCTION hash_password_function() RETURNS TRIGGER AS
$_plpgsql_$
    BEGIN
        IF( TG_OP = 'INSERT' OR (TG_OP = 'UPDATE' AND NEW.password <> OLD.password))
            THEN NEW.password = crypt(NEW.password, gen_salt('bf',12));
        END IF;

        RETURN NEW;
    END;
$_plpgsql_$
LANGUAGE plpgsql;

/* from https://gitlab.multimedia.hs-augsburg.de/kowa/wk_account_postgres_01a.git */
CREATE TRIGGER hash_password_trigger
BEFORE INSERT OR UPDATE
ON account
FOR EACH ROW
    EXECUTE PROCEDURE hash_password_function()
;

/* from https://gitlab.multimedia.hs-augsburg.de/kowa/wk_account_postgres_01a.git */
CREATE FUNCTION check_password(usrname VARCHAR, pw VARCHAR) RETURNS BOOLEAN AS
$_SQL_$
    SELECT EXISTS
        (SELECT *
         FROM account
         WHERE usrname = username AND password = crypt(pw, password)
        );
$_SQL_$
LANGUAGE SQL
IMMUTABLE
RETURNS NULL ON NULL INPUT;

COMMIT;


/* Insert Data */

BEGIN;

INSERT INTO e_language (name)
VALUES
('javascript'),
('python'),
('java'),
('c#'),
('c++');

COMMIT;


/* Insert Testdata */

BEGIN;

INSERT INTO account (username, password)
VALUES
('tinykoala648', 'raistlin'),
('heavyduck567', 'santafe'),
('smallladybug804', 'aztnm');

INSERT INTO post (title, content, language_id, user_id)
VALUES 
('My first post', 'Hello World', (SELECT id
                                  FROM   e_language
                                  WHERE  name = 'javascript'
                                 ),
                                 (SELECT id
                                  FROM   account
                                  WHERE  username = 'tinykoala648'
                                 )
),
('My second post', 'Hello World in Python', (SELECT id
                                             FROM   e_language
                                             WHERE  name = 'python'
                                            ),
                                            (SELECT id
                                             FROM   account
                                             WHERE  username = 'tinykoala648'
                                            )
),
('A Hello World Post', 'Hello World!', (SELECT id
                                        FROM   e_language
                                        WHERE  name = 'javascript'
                                       ),
                                       (SELECT id
                                        FROM   account
                                        WHERE  username = 'smallladybug804'
                                       )
);


COMMIT;
