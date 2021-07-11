/*************************************************************************************
 * has_category: POST function
 * as in https://gitlab.multimedia.hs-augsburg.de/kowa/wk_account_postgres_01
 
 * modified to work with relationship compatible rest_helper
 *************************************************************************************/
BEGIN;

/* Cleanup */
DROP FUNCTION IF EXISTS post_has_category (_data JSONB);

/* Function */
-- uses relationship functionality of rest_helper
CREATE FUNCTION post_has_category (_data JSONB)
    RETURNS TABLE (result JSONB)
LANGUAGE plpgsql
AS
$$
    BEGIN
        RETURN QUERY
        SELECT rest_helper
        ('INSERT INTO has_category ("post_id", "category_id")
          VALUES (($2->>''post_id'')::UUID,
                  ($2->>''category_id'')::UUID)',
         _data => _data, _http_status => 201, 
         _relationship => TRUE, _id1 => 'post_id', _id2 => 'category_id'      
        );
    END;
$$
;

COMMIT;

/*
SELECT * FROM post;
SELECT * FROM e_category;
SELECT * FROM has_category;
SELECT * FROM post_has_category
         ('{ "post_id":     "copy_here", 
             "category_id": "copy_here"
           }'
         );
SELECT * FROM has_category;
*/
