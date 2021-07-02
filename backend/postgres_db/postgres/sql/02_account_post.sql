/*************************************************************************************
 * account: POST function
 * from https://gitlab.multimedia.hs-augsburg.de/kowa/wk_account_postgres_01
 *************************************************************************************/

BEGIN;

/* Cleanup */
DROP FUNCTION IF EXISTS post_account (_data JSONB);

/* Function */
CREATE FUNCTION post_account (_data JSONB)
    RETURNS TABLE (result JSONB)
LANGUAGE plpgsql
AS
$$
    BEGIN
        RETURN QUERY 
        SELECT rest_helper
               ('INSERT INTO account (username, password)
                 VALUES(json_attr_value_d_untainted($2, ''username'', NULL),
                        ($2->>''password'')::VARCHAR
                       )',
                 _data => _data, _http_status => 201
               );
    END;
$$
;

COMMIT;

/*
SELECT * FROM account;
SELECT *
FROM   post_account
       ( '{ "username": "bigfish593",
            "password": "whiplash"
          }
         '
        );
SELECT * FROM account;
*/