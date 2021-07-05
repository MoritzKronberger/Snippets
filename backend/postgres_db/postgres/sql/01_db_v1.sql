/*************************************************************************************
 * Create Tables for db_v1
 *************************************************************************************/

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
AS VARCHAR CHECK (value !~ '[<>"'';]|--|/\*');

CREATE DOMAIN D_CATEGORY
AS VARCHAR CHECK (value ~ '^[A-Za-z0-9]+$');


/* Create Tables */

/* from https://gitlab.multimedia.hs-augsburg.de/kowa/wk_account_postgres_01a.git */
CREATE TABLE account 
(id                     UUID                DEFAULT gen_random_uuid(),
 username               D_UNTAINTED         NOT NULL,
 password               VARCHAR             NOT NULL,

 CONSTRAINT account_pk
    PRIMARY KEY (id),

 CONSTRAINT account_unique_username
    UNIQUE (username),

  CONSTRAINT account_username_length
    CHECK (LENGTH(username)<31)
);

CREATE TABLE e_language
(id                     UUID                DEFAULT gen_random_uuid(),
 name                   D_UNTAINTED         NOT NULL ,

 CONSTRAINT e_language_pk
    PRIMARY KEY (id),

 CONSTRAINT e_language_unique_name
    UNIQUE (name)
);

CREATE TABLE e_category
(id                     UUID                DEFAULT gen_random_uuid(),
 name                   D_CATEGORY          NOT NULL, 
 trigram_category       TEXT,

 CONSTRAINT e_category_pk
    PRIMARY KEY (id),

 CONSTRAINT e_category_unique_name
    UNIQUE (name),

 CONSTRAINT category_name_length
    CHECK (LENGTH(name)<11)
);

CREATE TABLE post
(id                     UUID                              DEFAULT gen_random_uuid(),
 creation_time          TIMESTAMP WITH TIME ZONE          NOT NULL    DEFAULT CURRENT_TIMESTAMP,
 title                  D_UNTAINTED                       NOT NULL    DEFAULT 'A fancy title',
 content                TEXT                              NOT NULL,
 language_id            UUID                              NOT NULL,
 user_id                UUID                              NOT NULL,

 CONSTRAINT post_pk
    PRIMARY KEY (id),

 CONSTRAINT fk_language_id
    FOREIGN KEY (language_id) REFERENCES e_language (id),

 CONSTRAINT fk_user_id
    FOREIGN KEY (user_id)     REFERENCES account (id) ON DELETE CASCADE,

 CONSTRAINT post_title_length
    CHECK (LENGTH(title)<81),

  CONSTRAINT post_content_length
    CHECK (LENGTH(content)<401)
);

CREATE TABLE has_category
(post_id                UUID                NOT NULL,
 category_id            UUID                NOT NULL,

 CONSTRAINT pk_has_category
    PRIMARY KEY (post_id, category_id),

 CONSTRAINT fk_post_id
    FOREIGN KEY (post_id)     REFERENCES post (id) ON DELETE CASCADE,

 CONSTRAINT fk_category_id
    FOREIGN KEY (category_id) REFERENCES e_category (id)
);

CREATE TABLE comment
(id                     UUID                              DEFAULT gen_random_uuid(),
 creation_time          TIMESTAMP WITH TIME ZONE          NOT NULL DEFAULT CURRENT_TIMESTAMP,
 content                D_UNTAINTED                       NOT NULL,
 user_id                UUID                              NOT NULL,
 post_id                UUID                              NOT NULL,

 CONSTRAINT comment_pk
    PRIMARY KEY (id),

 CONSTRAINT fk_user_id
    FOREIGN KEY (user_id) REFERENCES account (id) ON DELETE CASCADE,

 CONSTRAINT fk_post_id
    FOREIGN KEY (post_id) REFERENCES post (id) ON DELETE CASCADE,

 CONSTRAINT comment_content_length
    CHECK (LENGTH(content)<181)
);


CREATE TABLE user_like
(id                     UUID                              DEFAULT gen_random_uuid(),
 creation_time          TIMESTAMP WITH TIME ZONE          NOT NULL DEFAULT CURRENT_TIMESTAMP,
 user_id                UUID                              NOT NULL,
 post_id                UUID,
 comment_id             UUID,
 
 CONSTRAINT user_like_pk
    PRIMARY KEY (id),

 CONSTRAINT fk_user_id
    FOREIGN KEY (user_id)    REFERENCES account (id) ON DELETE CASCADE,

 CONSTRAINT fk_post_id
    FOREIGN KEY (post_id)    REFERENCES post (id) ON DELETE CASCADE,

 CONSTRAINT fk_comment_id
    FOREIGN KEY (comment_id) REFERENCES comment (id) ON DELETE CASCADE,

 CONSTRAINT user_like_unique_user_id_post_id
    UNIQUE (user_id, post_id),

 CONSTRAINT user_like_unique_user_id_comment_id
    UNIQUE (user_id, comment_id),

 CONSTRAINT user_like_subject_not_null
    CHECK (post_id IS NOT NULL OR comment_id IS NOT NULL),

 CONSTRAINT user_like_no_double_subjects 
    CHECK (NOT (post_id IS NOT NULL AND comment_id IS NOT NULL))    
);


CREATE TABLE e_sort_by
(id                   UUID            DEFAULT gen_random_uuid(),
 sort_by              D_UNTAINTED     NOT NULL,   
 view_name            D_UNTAINTED     NOT NULL,

 CONSTRAINT e_sort_by_pk
    PRIMARY KEY (id),

 CONSTRAINT e_sort_by_unique_sort_by
    UNIQUE (sort_by),

 CONSTRAINT e_sort_by_unique_view_name
    UNIQUE (view_name)
);


/* Create Triggers and Functions */

/* from https://gitlab.multimedia.hs-augsburg.de/kowa/wk_account_postgres_01a.git */
CREATE FUNCTION hash_password_function() RETURNS TRIGGER AS
$_plpgsql_$
    BEGIN
        IF(LENGTH(NEW.password)<6)
            THEN RAISE EXCEPTION 'minimum_password_legth';
        ELSIF(TG_OP = 'INSERT' OR (TG_OP = 'UPDATE' AND NEW.password <> OLD.password))
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


CREATE FUNCTION cleanup_categories_function() RETURNS TRIGGER AS
$_plpgsql_$
    BEGIN
        IF( TG_OP = 'DELETE' AND NOT EXISTS (SELECT * FROM has_category WHERE category_id = OLD.category_id))
            THEN 
               DELETE
               FROM e_category
               WHERE id = OLD.category_id;
        END IF;

        RETURN NULL;
    END;
$_plpgsql_$
LANGUAGE plpgsql;

CREATE TRIGGER cleanup_categories_trigger
AFTER DELETE
ON has_category
FOR EACH ROW
    EXECUTE PROCEDURE cleanup_categories_function()
;
