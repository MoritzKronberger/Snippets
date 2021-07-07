/*************************************************************************************
 * Insert test data
 *************************************************************************************/

BEGIN;

/* accounts */
INSERT INTO account ("username", "password")
VALUES
('tinykoala648', 'raistlin'),
('heavyduck567', 'santafe'),
('smallladybug804', 'supersecret');

/* categories */
INSERT INTO e_category ("name")
VALUES
('web'),
('webProg'),
('js'),
('sql'),
('postgres'),
('python'),
('helloWorld'),
('code'),
('es6');

/* posts */
INSERT INTO post ("title", "content", "language_id", "user_id")
VALUES 
('Hello World in Javascript', 'console.log("Hello World");',                                          (SELECT "id" FROM e_language WHERE "name"='javascript'), (SELECT "id" FROM account WHERE "username"='tinykoala648')),
('Hello World in Python',     'print("Hello World")',                                                 (SELECT "id" FROM e_language WHERE "name"='python'),     (SELECT "id" FROM account WHERE "username"='tinykoala648')),
('Hello World in Postgres',   'SELECT * FROM hello_world";',                                          (SELECT "id" FROM e_language WHERE "name"='plsql'),      (SELECT "id" FROM account WHERE "username"='heavyduck567')),
('Fizz Buzz',                 'for(let i=0;i<100;)console.log((++i%3?"":"fizz")+(i%5?'':"buzz")||i)', (SELECT "id" FROM e_language WHERE "name"='javascript'), (SELECT "id" FROM account WHERE "username"='smallladybug804'));

/* post categories */
INSERT INTO has_category ("post_id", "category_id")
VALUES
((SELECT "id"
  FROM   post
  WHERE  "title" = 'Hello World in Javascript'
  FETCH FIRST ROW ONLY
 ),
 (SELECT "id"
  FROM   e_category
  WHERE  name = 'js'
 )
),
((SELECT "id"
  FROM   post
  WHERE  "title" = 'Hello World in Javascript'
  FETCH FIRST ROW ONLY
 ),
 (SELECT "id"
  FROM   e_category
  WHERE  name = 'helloWorld'
 )
),
((SELECT "id"
  FROM   post
  WHERE  "title" = 'Hello World in Javascript'
  FETCH FIRST ROW ONLY
 ),
 (SELECT "id"
  FROM   e_category
  WHERE  name = 'webProg'
 )
),
((SELECT "id"
  FROM   post
  WHERE  "title" = 'Hello World in Javascript'
  FETCH FIRST ROW ONLY
 ),
 (SELECT "id"
  FROM   e_category
  WHERE  name = 'web'
 )
),
((SELECT "id"
  FROM   post
  WHERE  "title" = 'Hello World in Python'
  FETCH FIRST ROW ONLY
 ),
 (SELECT "id"
  FROM   e_category
  WHERE  name = 'python'
 )
),
((SELECT "id"
  FROM   post
  WHERE  "title" = 'Hello World in Python'
  FETCH FIRST ROW ONLY
 ),
 (SELECT "id"
  FROM   e_category
  WHERE  name = 'helloWorld'
 )
),
((SELECT "id"
  FROM   post
  WHERE  "title" = 'Hello World in Postgres'
  FETCH FIRST ROW ONLY
 ),
 (SELECT "id"
  FROM   e_category
  WHERE  name = 'helloWorld'
 )
),
((SELECT "id"
  FROM   post
  WHERE  "title" = 'Hello World in Postgres'
  FETCH FIRST ROW ONLY
 ),
 (SELECT "id"
  FROM   e_category
  WHERE  name = 'postgres'
 )
),
((SELECT "id"
  FROM   post
  WHERE  "title" = 'Fizz Buzz'
  FETCH FIRST ROW ONLY
 ),
 (SELECT "id"
  FROM   e_category
  WHERE  name = 'es6'
 )
),
((SELECT "id"
  FROM   post
  WHERE  "title" = 'Fizz Buzz'
  FETCH FIRST ROW ONLY
 ),
 (SELECT "id"
  FROM   e_category
  WHERE  name = 'code'
 )
);

/* comments */
INSERT INTO comment ("content", "user_id", "post_id")
VALUES 
('Nice post!', (SELECT "id" FROM account WHERE "username"='heavyduck567'),
               (SELECT "id"
                FROM   post
                WHERE  "title" = 'Hello World in Javascript'
                FETCH FIRST ROW ONLY
               )
),
('Hello!', (SELECT "id" FROM account WHERE "username"='heavyduck567'),
           (SELECT "id"
            FROM   post
            WHERE  "title" = 'Hello World in Postgres'
            FETCH FIRST ROW ONLY
           )
),
('Nice code!', (SELECT "id" FROM account WHERE "username"='heavyduck567'),
               (SELECT "id"
                FROM   post
                WHERE  "title" = 'Fizz Buzz'
                FETCH FIRST ROW ONLY
               )
),
('Nice post!', (SELECT "id" FROM account WHERE "username"='smallladybug804'),
               (SELECT "id"
                FROM   post
                WHERE  "title" = 'Fizz Buzz'
                FETCH FIRST ROW ONLY
               )
);

/* post likes */
INSERT INTO user_like ("user_id", "post_id", "comment_id")
VALUES 
((SELECT "id"
  FROM   account
  WHERE  "username" = 'heavyduck567'
 ),
 (SELECT "id"
  FROM   post
  WHERE  "title" = 'Hello World in Javascript'
  FETCH FIRST ROW ONLY
 ), NULL
),
((SELECT "id"
  FROM   account
  WHERE  "username" = 'tinykoala648'
 ),
 (SELECT "id"
  FROM   post
  WHERE  "title" = 'Fizz Buzz'
  FETCH FIRST ROW ONLY
 ), NULL
),
((SELECT "id"
  FROM   account
  WHERE  "username" = 'heavyduck567'
 ),
 (SELECT "id"
  FROM   post
  WHERE  "title" = 'Fizz Buzz'
  FETCH FIRST ROW ONLY
 ), NULL
);

/* comment likes */
INSERT INTO user_like ("user_id", "post_id", "comment_id")
VALUES 
((SELECT "id"
  FROM   account
  WHERE  "username" = 'tinykoala648'
 ), NULL,
 (SELECT "id"
  FROM   comment
  WHERE  "content" = 'Nice post!'
  FETCH FIRST ROW ONLY
 )
),
((SELECT "id"
  FROM   account
  WHERE  "username" = 'tinykoala648'
 ), NULL,
 (SELECT "id"
  FROM   comment
  WHERE  "content" = 'Hello!'
  FETCH FIRST ROW ONLY
 )
),
((SELECT "id"
  FROM   account
  WHERE  "username" = 'heavyduck567'
 ), NULL,
 (SELECT "id"
  FROM   comment
  WHERE  "content" = 'Nice code!'
  FETCH FIRST ROW ONLY
 )
);

/* test constraint vioaltions */
/*
INSERT INTO user_like ("user_id", "post_id", "comment_id")
VALUES 
((SELECT id
  FROM   account
  WHERE  "username" = 'tinykoala648'
 ), NULL, NULL),
((SELECT id
  FROM   account
  WHERE  "username" = 'heavyduck567'
 ),
 (SELECT id
  FROM   post
  WHERE  "title" = 'My first post'
  FETCH FIRST ROW ONLY
 ),
 (SELECT id
  FROM   comment
  WHERE  "content" = 'Nice code!'
  FETCH FIRST ROW ONLY
 )
);
*/

COMMIT;
