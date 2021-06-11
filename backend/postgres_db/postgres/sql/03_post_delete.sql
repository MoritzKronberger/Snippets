/*************************************************************************************
 * post: DELETE function
 *************************************************************************************/

BEGIN;

/* Cleanup */
DROP FUNCTION IF EXISTS delete_post (id UUID);

/* Function */
CREATE FUNCTION delete_post (id UUID)
    RETURNS TABLE (status INTEGER, result JSONB)
LANGUAGE plpgsql
AS
$$
    DECLARE 
        _id UUID;
    BEGIN
        DELETE 
        FROM post p
        WHERE p.id = $1
        RETURNING p.id INTO _id;

        RETURN QUERY
        SELECT CASE WHEN _id IS NOT NULL THEN 200 ELSE 404 END,
            JSONB_BUILD_OBJECT('id', $1);
    END
$$
;

COMMIT;

/*
SELECT * FROM post;
SELECT * FROM delete_post((SELECT id FROM post WHERE title = 'My first post'));
SELECT * FROM post;
*/
