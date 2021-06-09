/*************************************************************************************
 * account: POST function
 * from https://gitlab.multimedia.hs-augsburg.de/kowa/wk_account_postgres_01
 *************************************************************************************/

BEGIN;

/* Cleanup */
DROP FUNCTION IF EXISTS post_account (data JSONB);

/* Function */
CREATE FUNCTION post_account (data JSONB)
    RETURNS TABLE (status INTEGER, result JSONB)
LANGUAGE plpgsql
AS
$$
    DECLARE
        _id      UUID;
        _state   TEXT;
        _cname   TEXT;
        _message TEXT;
    BEGIN
        INSERT INTO account (username, password, profile_picture)
        VALUES(($1->>'username')::D_UNTAINTED,
               ($1->>'password')::VARCHAR,
               NULL
              )
        RETURNING id INTO _id;

        RETURN QUERY
        SELECT 201, JSONB_BUILD_OBJECT('id', _id);

        EXCEPTION WHEN OTHERS THEN
            GET STACKED DIAGNOSTICS 
                _state   := RETURNED_SQLSTATE,
                _cname   := CONSTRAINT_NAME,
                _message := MESSAGE_TEXT;
            RETURN QUERY
            SELECT 400, 
                 JSONB_BUILD_OBJECT
                 ('state',      _state,
                  'constraint', _cname, 
                  'message',    _message,
                  'data',       $1
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