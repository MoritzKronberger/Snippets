/*************************************************************************************
 * post: DELETE function
 *************************************************************************************/

BEGIN;

/* Cleanup */
DROP FUNCTION IF EXISTS delete_post(_id UUID);

/* Function */
CREATE FUNCTION delete_post(_id UUID)
    RETURNS TABLE (result JSONB)
LANGUAGE plpgsql
AS
$$
    BEGIN
        RETURN QUERY
        SELECT rest_helper
        ('DELETE 
          FROM post p
          WHERE p."id" = $1',
          _id => _id, _constraint => 'post_exists'
        );
    END
$$
;

COMMIT;

/*
SELECT * FROM post;
SELECT * FROM delete_post((SELECT "id" FROM post WHERE "title" = 'My first post'));
SELECT * FROM post;
*/
