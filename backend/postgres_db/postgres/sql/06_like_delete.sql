/*************************************************************************************
 * like: DELETE function
 *************************************************************************************/

BEGIN;

/* Cleanup */
DROP FUNCTION IF EXISTS delete_like (_id UUID);

/* Function */
CREATE FUNCTION delete_like (_id UUID)
    RETURNS TABLE (result JSONB)
LANGUAGE plpgsql
AS
$$
    BEGIN
        RETURN QUERY
        SELECT rest_helper
        ('DELETE
          FROM user_like l
          WHERE l.id = $1',
         _id => _id, _constraint => 'like_exists'
        );
    END
$$
;

COMMIT;

/*
SELECT * FROM user_like;
SELECT * FROM delete_like('copy_here');
SELECT * FROM user_like;
*/
