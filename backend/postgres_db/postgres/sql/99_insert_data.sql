/*************************************************************************************
 * Insert app-data
 *************************************************************************************/

BEGIN;

/* supported languages for syntax highlighting */
INSERT INTO e_language (name)
VALUES
('javascript'),
('python'),
('html'),
('c#'),
('plsql');

/* feed sorting */
INSERT INTO e_sort_by (sort_by, view_name)
VALUES
('most liked', 'get_post_by_likes'),
('newest', 'get_post_by_newest'),
('best of today', 'get_post_by_likes_today'),
('best of this week', 'get_post_by_likes_week');

COMMIT;
