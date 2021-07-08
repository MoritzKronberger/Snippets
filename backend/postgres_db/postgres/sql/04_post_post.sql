/*************************************************************************************
 * post: POST function
 *************************************************************************************/

BEGIN;

/* Cleanup */
DROP FUNCTION IF EXISTS post_post (_data JSONB);

/* Function */
CREATE FUNCTION post_post (_data JSONB)
    RETURNS TABLE (result JSONB)
LANGUAGE plpgsql
AS
$$
    BEGIN
        RETURN QUERY
        SELECT rest_helper
        ('INSERT INTO post ("title", "content", "language_id", "user_id")
          VALUES(json_attr_value_d_untainted($2, ''title'', NULL),
                 ($2->>''content'')::TEXT,
                 ($2->>''language_id'')::UUID,
                 ($2->>''user_id'')::UUID
                )',
         _data => _data, _http_status => 201
        );
    END;
$$
;

COMMIT;

/*
SELECT * FROM account;
SELECT * FROM e_language;
SELECT * FROM post;
SELECT * 
FROM post_post
     ( '{ "title": "Created via stored function",
          "content": "This post was created via the stored function!",
          "language_id": "copy_here",
          "user_id": "copy_here"
        }'
     );
SELECT * FROM post;
*/
