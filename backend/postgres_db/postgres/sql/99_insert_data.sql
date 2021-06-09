/*************************************************************************************
 * Insert app-data
 *************************************************************************************/

BEGIN;

/* supported languages for syntax highlighting */
INSERT INTO e_language (name)
VALUES
('javascript'),
('python'),
('java'),
('c#'),
('c++');

/* feed sorting */
INSERT INTO e_sort_by (sort_by)
VALUES
('most liked'),
('newest'),
('best of today'),
('best of this week');

COMMIT;
