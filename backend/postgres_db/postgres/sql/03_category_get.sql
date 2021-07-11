/*************************************************************************************
 * category: GET views
 *************************************************************************************/

BEGIN;

/* Cleanup */
DROP VIEW IF EXISTS get_category;
DROP VIEW IF EXISTS get_category_join_post;

/* Views */
CREATE VIEW get_category ("id", "name")
AS
SELECT "id", "name"
FROM   e_category
;

CREATE VIEW get_category_join_post ("id", "name", "trigram_category", "post_id")
AS
SELECT c."id", c."name", c."trigram_category", hc."post_id"
FROM   e_category c
       JOIN has_category hc ON c."id" = hc."category_id"
;

COMMIT;
