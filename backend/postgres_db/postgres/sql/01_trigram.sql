/*********************************************************************************************
 * Create fulltext index for e_category name
 * based on https://kowa.hs-augsburg.de/beispiele/db/postgresql/volltext/volltext-trgm.sql
 *********************************************************************************************/

BEGIN;

/* 
TODO: Helper Functions needed? */
/* from https://kowa.hs-augsburg.de/beispiele/db/postgresql/volltext/volltext-trgm.sql */
/*
CREATE OR REPLACE FUNCTION delimiters_regexp() RETURNS TEXT AS 
$$
  SELECT '[^\w_+]+';
$$ 
LANGUAGE SQL
;

CREATE OR REPLACE FUNCTION transform_from() RETURNS TEXT ARRAY AS 
$$
  SELECT ARRAY['ä','ö','ü','ß'];
$$ 
LANGUAGE SQL
;

CREATE OR REPLACE FUNCTION transform_to() RETURNS TEXT ARRAY AS 
$$
  SELECT ARRAY['ae','oe','ue','ss'];
$$ 
LANGUAGE SQL
;

CREATE OR REPLACE FUNCTION normalize(p_text TEXT) RETURNS TEXT AS 
$_SQL_$
  SELECT STRING_AGG(w, ' ')
  FROM   (SELECT REGEXP_SPLIT_TO_TABLE(STRING_AGG(COALESCE((transform_to())[ARRAY_POSITION(transform_from(), c)],c),''), delimiters_regexp())
          FROM   REGEXP_SPLIT_TO_TABLE(LOWER(p_text), '') dummy(c)
         ) dummy(w)
$_SQL_$ 
LANGUAGE SQL
;
*/


/* Cleanup */
DROP TRIGGER IF EXISTS trigram_category_trigger ON e_category;
DROP FUNCTION IF EXISTS trigram_category_update_function();
DROP INDEX IF EXISTS trigram_category_index;

/* Create fulltext index for e_category name */
CREATE INDEX trigram_category_index ON e_category USING GIN(trigram_category gin_trgm_ops);

/* TODO: trigger on DELETE, UPDATE? */
/* Create trigger and function to update index on e_category INSERT, UPDATE */
CREATE FUNCTION trigram_category_update_function() RETURNS TRIGGER
AS 
$$
    BEGIN 
        NEW.trigram_category = NEW.name::TEXT;
        RETURN NEW;
    END
$$
LANGUAGE plpgsql
;

CREATE TRIGGER trigram_category_trigger BEFORE INSERT OR UPDATE
ON e_category
FOR EACH ROW
EXECUTE PROCEDURE
    trigram_category_update_function();
;

COMMIT;
