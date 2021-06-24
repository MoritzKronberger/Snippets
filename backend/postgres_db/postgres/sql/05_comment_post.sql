/*************************************************************************************
 * comment: POST function
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
        ('INSERT INTO comment (content, user_id, post_id)
          VALUES (($2->>''content'')::TEXT,
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
     ('{ "content": "This comment was created via the sored function!",
         "user_id": "copy_here",
         "post_id": "copy_here"
       }');
SELECT * FROM comment;
*/
