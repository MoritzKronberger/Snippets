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

DROP VIEW  IF EXISTS v_account    CASCADE;
DROP VIEW  IF EXISTS v_post       CASCADE;
DROP VIEW  IF EXISTS v_comment    CASCADE;


/* Create Domains */

/* from https://gitlab.multimedia.hs-augsburg.de/kowa/wk_account_postgres_01a.git */
CREATE DOMAIN D_UNTAINTED
AS VARCHAR CHECK (value !~ '[<>"'';]|--|/\*');


/* Create Tables */

/* from https://gitlab.multimedia.hs-augsburg.de/kowa/wk_account_postgres_01a.git */
CREATE TABLE account 
(id                     UUID                DEFAULT gen_random_uuid(),
 username               D_UNTAINTED         NOT NULL,
 password               VARCHAR             NOT NULL,
 profile_picture        BYTEA,

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
 name                   D_UNTAINTED         NOT NULL, 
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


CREATE VIEW v_post (id, creation_time, title, content, language, num_likes, num_comments, username)
AS
SELECT p.id, p.creation_time, p.title, p.content, lg.name AS language, COUNT(DISTINCT lk.id) AS num_likes, COUNT(DISTINCT cm.id) AS num_comments, ac.username
FROM post p
     JOIN e_language lg ON p.language_id = lg.id
     JOIN v_account ac ON p.user_id = ac.id
     LEFT JOIN user_like lk ON p.id = lk.post_id
     LEFT JOIN v_comment cm ON p.id = cm.post_id
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
