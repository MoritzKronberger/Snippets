/*************************************************************************************
 * Insert test data
 *************************************************************************************/

BEGIN;

/* accounts */
INSERT INTO v_account (username, password)
VALUES
('tinykoala648', 'raistlin'),
('heavyduck567', 'santafe'),
('smallladybug804', 'aztnm');

/* categories */
INSERT INTO e_category (name)
VALUES
('web'),
('js'),
('python'),
('helloWorld'),
('code'),
('es6');

/* posts */
INSERT INTO v_post (title, content, language, username)
VALUES 
('My first post', 'Hello World', 'javascript', 'tinykoala648'),
('My second post', 'Hello World in Python', 'python', 'tinykoala648'),
('A Hello World Post', 'Hello World!', 'javascript', 'smallladybug804');

/* post categories */
INSERT INTO has_category (post_id, category_id)
VALUES
((SELECT id
  FROM   v_post
  WHERE  title = 'My first post'
  FETCH FIRST ROW ONLY
 ),
 (SELECT id
  FROM   e_category
  WHERE  name = 'js'
 )
),
((SELECT id
  FROM   v_post
  WHERE  title = 'My first post'
  FETCH FIRST ROW ONLY
 ),
 (SELECT id
  FROM   e_category
  WHERE  name = 'helloWorld'
 )
),
((SELECT id
  FROM   v_post
  WHERE  title = 'My first post'
  FETCH FIRST ROW ONLY
 ),
 (SELECT id
  FROM   e_category
  WHERE  name = 'web'
 )
),
((SELECT id
  FROM   v_post
  WHERE  title = 'My second post'
  FETCH FIRST ROW ONLY
 ),
 (SELECT id
  FROM   e_category
  WHERE  name = 'python'
 )
),
((SELECT id
  FROM   v_post
  WHERE  title = 'My second post'
  FETCH FIRST ROW ONLY
 ),
 (SELECT id
  FROM   e_category
  WHERE  name = 'helloWorld'
 )
),
((SELECT id
  FROM   v_post
  WHERE  title = 'A Hello World Post'
  FETCH FIRST ROW ONLY
 ),
 (SELECT id
  FROM   e_category
  WHERE  name = 'es6'
 )
),
((SELECT id
  FROM   v_post
  WHERE  title = 'A Hello World Post'
  FETCH FIRST ROW ONLY
 ),
 (SELECT id
  FROM   e_category
  WHERE  name = 'code'
 )
);

/* comments */
INSERT INTO v_comment (content, username, post_id)
VALUES 
('Nice post!', 'heavyduck567',
               (SELECT id
                FROM   v_post
                WHERE  title = 'My first post'
                FETCH FIRST ROW ONLY
               )
),
('Nice code!', 'heavyduck567',
               (SELECT id
                FROM   v_post
                WHERE  title = 'A Hello World Post'
                FETCH FIRST ROW ONLY
               )
),
('Nice post!', 'smallladybug804',
               (SELECT id
                FROM   v_post
                WHERE  title = 'A Hello World Post'
                FETCH FIRST ROW ONLY
               )
);

/* post likes */
INSERT INTO user_like (user_id, post_id, comment_id)
VALUES 
((SELECT id
  FROM   v_account
  WHERE  username = 'heavyduck567'
 ),
 (SELECT id
  FROM   v_post
  WHERE  title = 'My first post'
  FETCH FIRST ROW ONLY
 ), NULL
),
((SELECT id
  FROM   v_account
  WHERE  username = 'tinykoala648'
 ),
 (SELECT id
  FROM   v_post
  WHERE  title = 'A Hello World Post'
  FETCH FIRST ROW ONLY
 ), NULL
),
((SELECT id
  FROM   v_account
  WHERE  username = 'tinykoala648'
 ),
 (SELECT id
  FROM   v_post
  WHERE  title = 'My first post'
  FETCH FIRST ROW ONLY
 ), NULL
);

/* comment likes */
INSERT INTO user_like (user_id, post_id, comment_id)
VALUES 
((SELECT id
  FROM   v_account
  WHERE  username = 'tinykoala648'
 ), NULL,
 (SELECT id
  FROM   v_comment
  WHERE  content = 'Nice post!'
  FETCH FIRST ROW ONLY
 )
),
((SELECT id
  FROM   v_account
  WHERE  username = 'heavyduck567'
 ), NULL,
 (SELECT id
  FROM   v_comment
  WHERE  content = 'Nice code!'
  FETCH FIRST ROW ONLY
 )
);

/* test constraint vioaltions */
/*
INSERT INTO user_like (user_id, post_id, comment_id)
VALUES 
((SELECT id
  FROM   account
  WHERE  username = 'tinykoala648'
 ), NULL, NULL),
((SELECT id
  FROM   account
  WHERE  username = 'heavyduck567'
 ),
 (SELECT id
  FROM   post
  WHERE  title = 'My first post'
  FETCH FIRST ROW ONLY
 ),
 (SELECT id
  FROM   comment
  WHERE  content = 'Nice code!'
  FETCH FIRST ROW ONLY
 )
);
*/

COMMIT;
