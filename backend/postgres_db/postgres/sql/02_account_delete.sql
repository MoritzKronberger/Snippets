/*************************************************************************************
 * account: DELETE function
 * from https://gitlab.multimedia.hs-augsburg.de/kowa/wk_account_postgres_01
 *************************************************************************************/

BEGIN;

/* Cleanup */
DROP FUNCTION IF EXISTS delete_account(_id UUID);

/* Function */
CREATE FUNCTION delete_account(_id UUID)
    RETURNS TABLE (result JSONB)
LANGUAGE plpgsql
AS
$$
    BEGIN  
        RETURN QUERY
        SELECT rest_helper
        ('DELETE
          FROM  account a
          WHERE a."id" = $1',
         _id => _id, _constraint => 'account_exists'
        );
    END
$$
;

COMMIT;

/*
SELECT * FROM account;
SELECT * FROM delete_account((SELECT "id" FROM account WHERE "username" = 'tinykoala648'));
SELECT * FROM account;
*/
