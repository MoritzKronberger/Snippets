/*************************************************************************************
 * comment: GET views
 *************************************************************************************/

BEGIN;

/* Cleanup */
DROP VIEW IF EXISTS get_comment;
DROP VIEW IF EXISTS get_full_comment;

/* Views */
CREATE VIEW get_comment ("id", "creation_time", "content", "user_id", "post_id")
AS
SELECT "id", "creation_time", "content", "user_id", "post_id"
FROM comment
;

-- returns comment with username, number of likes
CREATE VIEW get_full_comment ("id", "creation_time", "content", "post_id", 
                              "user_id", "username", 
                              "num_likes")
AS
SELECT c."id", c."creation_time", c."content", c."post_id", 
       a."id" AS "user_id", a."username", 
       COUNT(lk."id") AS "num_likes"
FROM   comment c
       JOIN account a         ON c."user_id" = a."id"
       LEFT JOIN user_like lk ON c."id" = lk."comment_id"
GROUP BY c."id", a."id"
;

COMMIT;
