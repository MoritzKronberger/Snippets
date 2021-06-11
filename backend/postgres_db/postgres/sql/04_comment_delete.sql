/*************************************************************************************
 * comment: DELETE function
 *************************************************************************************/

BEGIN;

/* Cleanup */
DROP FUNCTION IF EXISTS delete_comment (id UUID);

/* Function */
CREATE FUNCTION delete_comment (id UUID)
    RETURNS TABLE (status INTEGER, result JSONB)
LANGUAGE plpgsql
AS
$$
    DECLARE 
        _id UUID;
    BEGIN 
        DELETE
        FROM comment c
        WHERE c.id = $1
        RETURNING c.id INTO _id;

        RETURN QUERY
        SELECT CASE WHEN _id IS NOT NULL THEN 200 ELSE 404 END,
            JSONB_BUILD_OBJECT('id', $1);
    END
$$
;

COMMIT;

/*
SELECT * FROM comment;
SELECT * FROM delete_comment((SELECT id FROM comment WHERE content = 'Nice code!'));
SELECT * FROM comment;
*/
