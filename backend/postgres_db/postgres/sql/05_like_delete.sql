/*************************************************************************************
 * like: DELETE function
 *************************************************************************************/

BEGIN;

/* Cleanup */
DROP FUNCTION IF EXISTS delete_like (id UUID);

/* Function */
CREATE FUNCTION delete_like (id UUID)
    RETURNS TABLE (status INTEGER, result JSONB)
LANGUAGE plpgsql
AS
$$
    DECLARE 
        _id UUID;
    BEGIN
        DELETE
        FROM user_like l
        WHERE l.id = $1
        RETURNING l.id INTO _id;

        RETURN QUERY
        SELECT CASE WHEN _id IS NOT NULL THEN 200 ELSE 404 END,
            JSONB_BUILD_OBJECT('id', $1);
    END
$$
;

COMMIT;

/*
SELECT * FROM user_like;
SELECT * FROM delete_like('copy_here');
SELECT * FROM user_like;
*/
