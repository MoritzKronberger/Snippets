BEGIN;

/* CLEANUP */

DROP TABLE IF EXISTS account      CASCADE;
DROP TABLE IF EXISTS post         CASCADE;
DROP TABLE IF EXISTS comment      CASCADE;
DROP TABLE IF EXISTS user_like    CASCADE;
DROP TABLE IF EXISTS e_language   CASCADE;
DROP TABLE IF EXISTS e_category   CASCADE;
DROP TABLE IF EXISTS has_category CASCADE;

DROP VIEW  IF EXISTS v_account    CASCADE;
DROP VIEW  IF EXISTS v_post       CASCADE;
DROP VIEW  IF EXISTS v_comment    CASCADE;


/* Create Domains */

/* from https://gitlab.multimedia.hs-augsburg.de/kowa/wk_account_postgres_01a.git */
CREATE DOMAIN D_UNTAINTED
AS VARCHAR (25) CHECK (value !~ '[<>"'';]|--|/\*');


/* Create Tables */

/* from https://gitlab.multimedia.hs-augsburg.de/kowa/wk_account_postgres_01a.git */
CREATE TABLE account 
(id                     UUID                PRIMARY KEY DEFAULT gen_random_uuid(),
 username               D_UNTAINTED         UNIQUE  NOT NULL,
 password               VARCHAR             NOT NULL,
 profile_picture        BYTEA
);

CREATE TABLE e_language
(id                     UUID                PRIMARY KEY DEFAULT gen_random_uuid(),
 name                   D_UNTAINTED         UNIQUE      NOT NULL 
);

CREATE TABLE e_category
(id                     UUID                PRIMARY KEY DEFAULT gen_random_uuid(),
 name                   D_UNTAINTED         UNIQUE      NOT NULL 
);

CREATE TABLE post
(id                     UUID                              PRIMARY KEY DEFAULT gen_random_uuid(),
 creation_time          TIMESTAMP WITH TIME ZONE          NOT NULL    DEFAULT CURRENT_TIMESTAMP,
 title                  VARCHAR (30)                      NOT NULL    DEFAULT 'A fancy title',
 content                TEXT                              NOT NULL,
 language_id            UUID                              NOT NULL,
 user_id                UUID                              NOT NULL,

 CONSTRAINT fk_language_id
    FOREIGN KEY (language_id) REFERENCES e_language (id),

 CONSTRAINT fk_user_id
    FOREIGN KEY (user_id)     REFERENCES account (id)
);

CREATE TABLE has_category
(post_id                UUID                NOT NULL,
 category_id            UUID                NOT NULL,

 CONSTRAINT pk_has_category
    PRIMARY KEY (post_id, category_id),

 CONSTRAINT fk_post_id
    FOREIGN KEY (post_id)     REFERENCES post (id),

 CONSTRAINT fk_category_id
    FOREIGN KEY (category_id) REFERENCES e_category (id)
);

CREATE TABLE comment
(id                     UUID                              PRIMARY KEY DEFAULT gen_random_uuid(),
 creation_time          TIMESTAMP WITH TIME ZONE          NOT NULL DEFAULT CURRENT_TIMESTAMP,
 content                TEXT                              NOT NULL,
 user_id                UUID                              NOT NULL,
 post_id                UUID                              NOT NULL,

 CONSTRAINT fk_user_id
    FOREIGN KEY (user_id) REFERENCES account (id),

 CONSTRAINT fk_post_id
    FOREIGN KEY (post_id) REFERENCES post (id)
);


CREATE TABLE user_like
(id                     UUID                              PRIMARY KEY DEFAULT gen_random_uuid(),
 creation_time          TIMESTAMP WITH TIME ZONE          NOT NULL DEFAULT CURRENT_TIMESTAMP,
 user_id                UUID                              NOT NULL,
 post_id                UUID,
 comment_id             UUID,

 CONSTRAINT fk_user_id
    FOREIGN KEY (user_id)    REFERENCES account (id),

 CONSTRAINT fk_post_id
    FOREIGN KEY (post_id)    REFERENCES post (id),

 CONSTRAINT fk_comment_id
    FOREIGN KEY (comment_id) REFERENCES comment (id),

 UNIQUE (user_id, post_id, comment_id),

 CONSTRAINT must_have_parent
    CHECK (post_id IS NOT NULL OR comment_id IS NOT NULL),

 CONSTRAINT no_double_parents 
    CHECK (NOT (post_id IS NOT NULL AND comment_id IS NOT NULL))    
);


/* Create Views */
/* As in  https://kowa.hs-augsburg.de/beispiele/db/postgresql/olympia/olympia3_create.sql*/

CREATE VIEW v_account (id, username, password, profile_picture)
AS
SELECT id, username, NULL, profile_picture
FROM account
;

DROP RULE IF EXISTS insert_v_account ON v_account CASCADE;
DROP RULE IF EXISTS delete_v_account ON v_account CASCADE;
DROP RULE IF EXISTS update_v_account ON v_account CASCADE;

CREATE RULE insert_v_account AS ON INSERT TO v_account
DO INSTEAD
INSERT INTO account(username, password, profile_picture)
VALUES (NEW.username,
        NEW.password,
        NEW.profile_picture
       );

CREATE RULE delete_v_account AS ON DELETE TO v_account
DO INSTEAD
DELETE FROM account
WHERE id = OLD.id;

CREATE RULE update_v_account AS ON UPDATE TO v_account
DO INSTEAD
UPDATE account
SET username = NEW.username,
    profile_picture = NEW.profile_picture
WHERE id = OLD.id;


CREATE VIEW v_post (id, creation_time, title, content, language, num_likes, num_comments, username)
AS
SELECT p.id, p.creation_time, p.title, p.content, lg.name AS language, COUNT(DISTINCT lk.id) AS num_likes, COUNT(DISTINCT cm.id) AS num_comments, ac.username
FROM post p
     JOIN e_language lg ON p.language_id = lg.id
     JOIN v_account ac ON p.user_id = ac.id
     LEFT JOIN user_like lk ON p.id = lk.post_id
     LEFT JOIN comment cm ON p.id = cm.post_id
GROUP BY p.id, lg.name, ac.username
; 

DROP RULE IF EXISTS insert_v_post ON v_post CASCADE;
DROP RULE IF EXISTS delete_v_post ON v_post CASCADE;
DROP RULE IF EXISTS update_v_post ON v_post CASCADE;

CREATE RULE insert_v_post AS ON INSERT TO v_post
DO INSTEAD
INSERT INTO post(title, content, language_id, user_id)
VALUES (NEW.title,
        NEW.content,
        (SELECT id FROM e_language WHERE name = NEW.language),
        (SELECT id FROM v_account  WHERE username = NEW.username)
        );

CREATE RULE delete_v_post AS ON DELETE TO v_post
DO INSTEAD
DELETE FROM post
WHERE id = OLD.id;

CREATE RULE update_v_post AS ON UPDATE TO v_post
DO INSTEAD
UPDATE post
SET title = NEW.title,
    content = NEW.content,
    language_id = (SELECT id FROM e_language WHERE name = NEW.language)
WHERE id = OLD.id;


CREATE VIEW v_comment (id, creation_time, content, num_likes, username, post_id)
AS
SELECT c.id, c.creation_time, c.content, COUNT(lk.id) AS num_likes, ac.username, c.post_id
FROM comment c
     JOIN v_account ac ON c.user_id = ac.id
     LEFT JOIN user_like lk ON c.id = lk.comment_id
GROUP BY c.id, ac.username
;

DROP RULE IF EXISTS insert_v_comment ON v_comment CASCADE;
DROP RULE IF EXISTS delete_v_comment ON v_comment CASCADE;
DROP RULE IF EXISTS update_v_comment ON v_comment CASCADE;

CREATE RULE insert_v_comment AS ON INSERT TO v_comment
DO INSTEAD
INSERT INTO comment(content, user_id, post_id)
VALUES (NEW.content,
        (SELECT id FROM v_account WHERE username = NEW.username),
        NEW.post_id
       );

CREATE RULE delete_v_comment AS ON DELETE TO v_comment
DO INSTEAD
DELETE FROM comment
WHERE id = OLD.id;

CREATE RULE update_v_comment AS ON UPDATE TO v_comment
DO INSTEAD
UPDATE comment
SET content = NEW.content
WHERE id = OLD.id;


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

INSERT INTO e_category (name)
VALUES
('web'),
('js'),
('python'),
('helloWorld'),
('code'),
('es6');

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

INSERT INTO has_category (post_id, category_id)
VALUES
((SELECT id
  FROM   post
  WHERE  title = 'My first post'
  FETCH FIRST ROW ONLY
 ),
 (SELECT id
  FROM   e_category
  WHERE  name = 'js'
 )
),
((SELECT id
  FROM   post
  WHERE  title = 'My first post'
  FETCH FIRST ROW ONLY
 ),
 (SELECT id
  FROM   e_category
  WHERE  name = 'helloWorld'
 )
),
((SELECT id
  FROM   post
  WHERE  title = 'My first post'
  FETCH FIRST ROW ONLY
 ),
 (SELECT id
  FROM   e_category
  WHERE  name = 'web'
 )
),
((SELECT id
  FROM   post
  WHERE  title = 'My second post'
  FETCH FIRST ROW ONLY
 ),
 (SELECT id
  FROM   e_category
  WHERE  name = 'python'
 )
),
((SELECT id
  FROM   post
  WHERE  title = 'My second post'
  FETCH FIRST ROW ONLY
 ),
 (SELECT id
  FROM   e_category
  WHERE  name = 'helloWorld'
 )
),
((SELECT id
  FROM   post
  WHERE  title = 'A Hello World Post'
  FETCH FIRST ROW ONLY
 ),
 (SELECT id
  FROM   e_category
  WHERE  name = 'es6'
 )
),
((SELECT id
  FROM   post
  WHERE  title = 'A Hello World Post'
  FETCH FIRST ROW ONLY
 ),
 (SELECT id
  FROM   e_category
  WHERE  name = 'code'
 )
);

INSERT INTO comment (content, user_id, post_id)
VALUES 
('Nice post!', (SELECT id
                FROM   account
                WHERE  username = 'heavyduck567'
               ),
               (SELECT id
                FROM   post
                WHERE  title = 'My first post'
                FETCH FIRST ROW ONLY
               )
),
('Nice code!', (SELECT id
                FROM   account
                WHERE  username = 'heavyduck567'
               ),
               (SELECT id
                FROM   post
                WHERE  title = 'A Hello World Post'
                FETCH FIRST ROW ONLY
               )
),
('Nice post!', (SELECT id
                FROM   account
                WHERE  username = 'smallladybug804'
               ),
               (SELECT id
                FROM   post
                WHERE  title = 'A Hello World Post'
                FETCH FIRST ROW ONLY
               )
);

/* post-likes */
INSERT INTO user_like (user_id, post_id, comment_id)
VALUES 
((SELECT id
  FROM   account
  WHERE  username = 'heavyduck567'
 ),
 (SELECT id
  FROM   post
  WHERE  title = 'My first post'
  FETCH FIRST ROW ONLY
 ), NULL
),
((SELECT id
  FROM   account
  WHERE  username = 'tinykoala648'
 ),
 (SELECT id
  FROM   post
  WHERE  title = 'A Hello World Post'
  FETCH FIRST ROW ONLY
 ), NULL
),
((SELECT id
  FROM   account
  WHERE  username = 'tinykoala648'
 ),
 (SELECT id
  FROM   post
  WHERE  title = 'My first post'
  FETCH FIRST ROW ONLY
 ), NULL
);

/* comment likes */
INSERT INTO user_like (user_id, post_id, comment_id)
VALUES 
((SELECT id
  FROM   account
  WHERE  username = 'tinykoala648'
 ), NULL,
 (SELECT id
  FROM   comment
  WHERE  content = 'Nice post!'
  FETCH FIRST ROW ONLY
 )
),
((SELECT id
  FROM   account
  WHERE  username = 'heavyduck567'
 ), NULL,
 (SELECT id
  FROM   comment
  WHERE  content = 'Nice code!'
  FETCH FIRST ROW ONLY
 )
);

/* test constraint vioaltions */
/*
INSERT INTO user_like (user_id, post_id, comment_id)
VALUES 
((SELECT id
  FROM   account
  WHERE  username = 'tinykoala648'
 ), NULL, NULL),
((SELECT id
  FROM   account
  WHERE  username = 'heavyduck567'
 ),
 (SELECT id
  FROM   post
  WHERE  title = 'My first post'
  FETCH FIRST ROW ONLY
 ),
 (SELECT id
  FROM   comment
  WHERE  content = 'Nice code!'
  FETCH FIRST ROW ONLY
 )
);
*/

COMMIT;
