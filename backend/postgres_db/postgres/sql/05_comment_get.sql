/*************************************************************************************
 * comment: GET views
 *************************************************************************************/

BEGIN;

/* Cleanup */
DROP VIEW IF EXISTS get_comment;
DROP VIEW IF EXISTS get_full_comment;

/* Views */
CREATE VIEW get_comment (id, creation_time, content, user_id, post_id)
AS
SELECT id, creation_time, content, user_id, post_id
FROM comment
;

CREATE VIEW get_full_comment (id, creation_time, content, post_id, user_id, username, profile_picture, num_likes)
AS
SELECT c.id, c.creation_time, c.content, p.id AS post_id, a.id AS user_id, a.username, a.profile_picture, COUNT(lk.id) AS num_likes
FROM comment c
     JOIN post p ON c.post_id = p.id 
     JOIN account a ON c.user_id = a.id
     LEFT JOIN user_like lk ON c.id = lk.comment_id
GROUP BY c.id, p.id, a.id
;

COMMIT;
