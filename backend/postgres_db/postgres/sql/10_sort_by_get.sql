/*************************************************************************************
 * sort_by: GET view
 *************************************************************************************/

BEGIN;

/* Cleanup */
DROP VIEW IF EXISTS get_sort_by;

/* View */
CREATE VIEW get_sort_by (id, sort_by)
AS
SELECT id, sort_by
FROM e_sort_by
;

COMMIT;
