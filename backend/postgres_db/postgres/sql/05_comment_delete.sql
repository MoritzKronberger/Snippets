/*************************************************************************************
 * comment: DELETE function
 *************************************************************************************/

BEGIN;

/* Cleanup */
DROP FUNCTION IF EXISTS delete_comment (_id UUID);

/* Function */
CREATE FUNCTION delete_comment (_id UUID)
    RETURNS TABLE (result JSONB)
LANGUAGE plpgsql
AS
$$
    BEGIN 
        RETURN QUERY
        SELECT rest_helper
        ('DELETE
          FROM comment c
          WHERE c.id = $1',
         _id => _id, _constraint => 'comment_exists'
        );
    END
$$
;

COMMIT;

/*
SELECT * FROM comment;
SELECT * FROM delete_comment((SELECT id FROM comment WHERE content = 'Nice code!'));
SELECT * FROM comment;
*/
