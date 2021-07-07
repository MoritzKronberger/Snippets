/*************************************************************************************
 * has_category: DELETE function
 *************************************************************************************/

BEGIN;

/* Cleanup */
DROP FUNCTION IF EXISTS delete_has_category (_data JSONB);

/* Function */
CREATE FUNCTION delete_has_category (_data JSONB)
    RETURNS TABLE (result JSONB)
LANGUAGE plpgsql
AS
$$
    BEGIN  
        RETURN QUERY
        SELECT rest_helper
        ('DELETE 
          FROM has_category hc
          WHERE hc."post_id" = ($2->>''post_id'')::UUID
                AND hc."category_id" = ($2->>''category_id'')::UUID',
         _data => _data, _constraint => 'has_category exists', _relationship => TRUE
        );
    END;
$$
;

COMMIT;

/*
SELECT * FROM has_category;
SELECT * FROM delete_has_category
         ('{ "post_id":     copy_here, 
             "category_id": copy_here
           }'
         );
SELECT * FROM has_category;
*/
