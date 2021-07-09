/*********************************************************************************************
 * Create fulltext index for e_category name
 * based on https://kowa.hs-augsburg.de/beispiele/db/postgresql/volltext/volltext-trgm.sql

 * normalizing not needed because of domain
 *********************************************************************************************/

BEGIN;

/* Cleanup */
DROP TRIGGER IF EXISTS trigram_category_trigger ON e_category;
DROP FUNCTION IF EXISTS trigram_category_update_function();
DROP INDEX IF EXISTS trigram_category_index;

/* Create trigram index for e_category name */
CREATE INDEX trigram_category_index ON e_category USING GIN("trigram_category" gin_trgm_ops);

/* Create trigger and function to update index on e_category INSERT, UPDATE */
CREATE FUNCTION trigram_category_update_function() RETURNS TRIGGER
AS 
$$
    BEGIN 
        NEW."trigram_category" = NEW."name"::TEXT;
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
