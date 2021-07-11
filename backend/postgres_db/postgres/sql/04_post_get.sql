/*************************************************************************************
 * post: GET views
 *************************************************************************************/

BEGIN;

/* Cleanup */
DROP VIEW IF EXISTS get_post;
DROP VIEW IF EXISTS get_full_post;
DROP VIEW IF EXISTS get_post_by_likes;
DROP VIEW IF EXISTS get_post_by_newest;
DROP VIEW IF EXISTS get_post_by_likes_today;
DROP VIEW IF EXISTS get_post_by_likes_week;

/* Views */
CREATE VIEW get_post ("id", "creation_time", "title", "content", "language_id", "user_id")
AS
SELECT "id", "creation_time", "title", "content", "language_id", "user_id"
FROM post
;

-- returns post with language as name, username, number of likes and comments and category names as an array
CREATE VIEW get_full_post ("id", "creation_time", "title", "content", 
                           "language", 
                           "user_id", "username", 
                           "num_likes", "num_comments", 
                           "categories")
AS
SELECT p."id", p."creation_time", p."title", p."content", 
       l."name" AS "language", 
       a."id"   AS "user_id", a."username", 
       COUNT(DISTINCT lk."id")         AS "num_likes", 
       COUNT(DISTINCT c."id")          AS "num_comments",
       ARRAY_AGG (DISTINCT ctg."name") AS "categories"
FROM   post p
       JOIN e_language l                    ON p."language_id" = l."id"
       JOIN account a                       ON p."user_id" = a."id"
       LEFT JOIN get_category_join_post ctg ON p."id" = ctg."post_id"
       LEFT JOIN user_like lk               ON p."id" = lk."post_id"
       LEFT JOIN comment c                  ON p."id" = c."post_id"
GROUP BY p."id", l."name", a."id"
;

-- returns full posts sorted by number of likes (descending)
CREATE VIEW get_post_by_likes ("sort_rank", 
                               "id", "creation_time", "title", "content", 
                               "language", 
                               "user_id", "username",  
                               "num_likes", "num_comments", 
                               "categories")
AS
SELECT RANK() OVER(ORDER BY "num_likes" DESC) AS "sort_rank", 
       "id", "creation_time", "title", "content", 
       "language", 
       "user_id", "username",  
       "num_likes", "num_comments", 
       "categories"
FROM   get_full_post
ORDER BY "sort_rank", "creation_time" DESC
;

-- returns full posts sorted by their creation time (descending)
CREATE VIEW get_post_by_newest ("sort_rank", 
                                "id", "creation_time", "title", "content", 
                                "language", 
                                "user_id", "username", 
                                "num_likes", "num_comments", 
                                "categories")
AS
SELECT RANK() OVER(ORDER BY "creation_time" DESC) AS "sort_rank", 
       "id", "creation_time", "title", "content", 
       "language", 
       "user_id", "username", 
       "num_likes", "num_comments", 
       "categories"
FROM   get_full_post
ORDER BY "sort_rank", "num_likes" DESC
;

-- returns full posts sorted by likes which were created within the last 24 hours
CREATE VIEW get_post_by_likes_today ("sort_rank", 
                                     "id", "creation_time", "title", "content", 
                                     "language", 
                                     "user_id", "username", 
                                     "num_likes", "num_comments", 
                                     "categories")
AS
SELECT "sort_rank", 
       id, 
       "creation_time", "title", "content", 
       "language", 
       "user_id", "username", 
       "num_likes", "num_comments", 
       "categories"
FROM   get_post_by_likes
WHERE  age(current_timestamp, "creation_time") <= '24 hours'
ORDER BY "sort_rank", "creation_time" DESC
;

-- returns full posts sorted by likes which were created within the last 7 days
CREATE VIEW get_post_by_likes_week ("sort_rank", 
                                    "id", "creation_time", "title", "content", 
                                    "language", 
                                    "user_id", "username", 
                                    "num_likes", "num_comments", 
                                    "categories")
AS
SELECT "sort_rank", 
       "id", 
       "creation_time", "title", "content", 
       "language", 
       "user_id", "username", 
       "num_likes", "num_comments", 
       "categories"
FROM   get_post_by_likes
WHERE  age(current_timestamp, "creation_time") <= '7 days'
ORDER BY "sort_rank", "creation_time" DESC
;

COMMIT;
