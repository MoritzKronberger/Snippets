/*************************************************************************************
 * has_category: DELETE function
 *************************************************************************************/

BEGIN;

/* Cleanup */
DROP FUNCTION IF EXISTS delete_has_category (p_id UUID, c_id UUID);

/* Function */
CREATE FUNCTION delete_has_category (p_id UUID, c_id UUID)
    RETURNS TABLE (status INTEGER, result JSONB)
LANGUAGE plpgsql
AS
$$
    DECLARE 
        _pid UUID;
        _cid UUID;
    BEGIN  
        DELETE 
        FROM has_category hc
        WHERE hc.post_id = $1
              AND hc.category_id = $2
        RETURNING hc.post_id, hc.category_id INTO _pid, _cid;

        RETURN QUERY
        SELECT CASE WHEN _pid IS NOT NULL THEN 200 ELSE 404 END,
            JSONB_BUILD_OBJECT('post_id', $1,
                               'category_id', $2);
    END
$$
;

COMMIT;

/*
SELECT * FROM has_category;
SELECT * FROM delete_has_category( 'post_id', 'category_id');
SELECT * FROM has_category;
*/
