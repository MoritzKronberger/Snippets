/*************************************************************************************
 * like: GET view
 *************************************************************************************/

BEGIN;

/* Cleanup */
DROP VIEW IF EXISTS get_like;

/* View */
CREATE VIEW get_like (id, user_id, subject_id)
AS
SELECT id, user_id, COALESCE(post_id, comment_id) AS subject_id
FROM user_like
;

COMMIT;
