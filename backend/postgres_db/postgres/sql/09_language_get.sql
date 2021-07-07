/*************************************************************************************
 * language: GET view
 *************************************************************************************/

BEGIN;

/* Cleanup */
DROP VIEW IF EXISTS get_language;

/* View */
CREATE VIEW get_language ("id", "name")
AS
SELECT "id", "name"
FROM e_language
;

COMMIT;
