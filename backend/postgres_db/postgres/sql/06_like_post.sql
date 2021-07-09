/*************************************************************************************
 * like: POST function
 * as in https://gitlab.multimedia.hs-augsburg.de/kowa/wk_account_postgres_01
 *************************************************************************************/

BEGIN;

/* Cleanup */
DROP FUNCTION IF EXISTS post_like (_data JSONB);

/* Function */
CREATE FUNCTION post_like (_data JSONB)
    RETURNS TABLE (result JSONB)
LANGUAGE plpgsql
AS
$$
    BEGIN
        RETURN QUERY
        SELECT rest_helper
        ('INSERT INTO user_like ("user_id", "post_id", "comment_id")
          VALUES(($2->>''user_id'')::UUID,
                 ($2->>''post_id'')::UUID,
                 ($2->>''comment_id'')::UUID
                )',
         _data => _data, _http_status => 201
        );
    END;
$$
;

COMMIT;

/*
SELECT * FROM account;
SELECT * FROM post;
SELECT * FROM user_like;
SELECT * 
FROM post_like
     ('{ "user_id": "copy_here",
         "post_id": "copy_here"
       }'
     );
SELECT * FROM user_like;

SELECT * FROM account;
SELECT * FROM comment;
SELECT * FROM user_like;
SELECT * 
FROM post_like
     ('{ "user_id":    "copy_here",
         "comment_id": "copy_here"
       }'
     );
SELECT * FROM user_like;
*/
