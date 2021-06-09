/*************************************************************************************
 * account: DELETE function
 * from https://gitlab.multimedia.hs-augsburg.de/kowa/wk_account_postgres_01
 *************************************************************************************/

BEGIN;

/* Cleanup */
DROP FUNCTION IF EXISTS delete_account (id UUID);

/* Function */
CREATE FUNCTION delete_account (id UUID)
    RETURNS TABLE (status INTEGER, result JSONB)
LANGUAGE plpgsql
AS
$$
    DECLARE 
        _id UUID;
    BEGIN   
        DELETE
        FROM account a
        WHERE a.id = $1
        RETURNING a.id INTO _id;

        RETURN QUERY
        SELECT CASE WHEN _id IS NOT NULL THEN 200 ELSE 404 END,
            JSONB_BUILD_OBJECT('id', $1);
    END
$$
;

COMMIT;

/*
SELECT * FROM account;
SELECT * FROM delete_account((SELECT id FROM account WHERE username = 'tinykoala648'));
SELECT * FROM account;
*/
