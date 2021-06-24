/*************************************************************************************
 * account: PATCH function
 * from https://gitlab.multimedia.hs-augsburg.de/kowa/wk_account_postgres_01
 *************************************************************************************/

BEGIN;

/* CLEANUP */
DROP FUNCTION IF EXISTS patch_account(_id UUID, _data JSONB);

/* Function */
CREATE FUNCTION patch_account(_id UUID, _data JSONB)
    RETURNS TABLE (result JSONB)
LANGUAGE plpgsql
AS
$$    
    BEGIN
        RETURN QUERY
        SELECT rest_helper
        ('UPDATE account a
          SET 
             username = json_attr_value_not_null_d_untainted($2, ''username'', a.username),
             password = json_attr_value_not_null            ($2, ''password'', a.password)::VARCHAR
          WHERE a.id = $1',
          _id => _id, _data => _data, _constraint => 'account exists'
        );
    END;
$$
;

COMMIT;

/*
SELECT * FROM account;
SELECT * 
FROM   patch_account
       ( (SELECT id FROM account WHERE username = 'tinykoala648'), 
         '{ "username": "hugekoala648",
            "password": "changeit"
          }
         '
        );
SELECT * FROM account;

SELECT * FROM account;
SELECT * 
FROM   patch_account
       ( (SELECT id FROM account WHERE username = 'tinykoala648'), 
         '{ "password": "changeit"
          }
         '
        );
SELECT * FROM account;

SELECT * FROM account;
SELECT * 
FROM   patch_account
       ( (SELECT id FROM account WHERE username = 'tinykoala648'), 
         '{}
         '
        );
SELECT * FROM account;
*/