/*************************************************************************************
 * comment: POST function
 * as in https://gitlab.multimedia.hs-augsburg.de/kowa/wk_account_postgres_01
 *************************************************************************************/

BEGIN;

/* Cleanup */
DROP FUNCTION IF EXISTS post_comment (_data JSONB);

/* Function */
CREATE FUNCTION post_comment (_data JSONB)
    RETURNS TABLE (result JSONB)
LANGUAGE plpgsql
AS
$$
    BEGIN
        RETURN QUERY
        SELECT rest_helper
        ('INSERT INTO comment ("content", "user_id", "post_id")
          VALUES (json_attr_value_d_untainted($2, ''content'', NULL),
                  ($2->>''user_id'')::UUID,
                  ($2->>''post_id'')::UUID
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
SELECT * FROM comment;
SELECT * 
FROM post_comment
     ('{ "content": "This comment was created via the stored function!",
         "user_id": "copy_here",
         "post_id": "copy_here"
       }'
     );
SELECT * FROM comment;
*/
