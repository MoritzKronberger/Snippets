/*************************************************************************************
 * sort_by: GET views
 *************************************************************************************/

BEGIN;

/* Cleanup */
DROP VIEW IF EXISTS get_sort_by;
DROP VIEW IF EXISTS get_sort_by_view_name;

/* Views */
CREATE VIEW get_sort_by (id, sort_by)
AS
SELECT id, sort_by
FROM e_sort_by
;

CREATE VIEW get_sort_by_view_name (id, view_name)
AS
SELECT id, view_name
FROM e_sort_by
;

COMMIT;
