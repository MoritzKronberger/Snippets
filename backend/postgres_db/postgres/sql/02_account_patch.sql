/*************************************************************************************
 * account: PATCH function
 * from https://gitlab.multimedia.hs-augsburg.de/kowa/wk_account_postgres_01
 *************************************************************************************/

BEGIN;

/* CLEANUP */
DROP FUNCTION IF EXISTS patch_account(id_ UUID, data JSONB);

/* Function */
CREATE FUNCTION patch_account(id UUID, data JSONB)
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
        UPDATE account a
        SET 
            username = CASE WHEN $2 ? 'username' THEN ($2->>'username')::D_UNTAINTED ELSE a.username END,
            password = CASE WHEN $2 ? 'password' THEN ($2->>'password')::D_UNTAINTED ELSE a.password END
        WHERE a.id = $1
        RETURNING a.id INTO _id;

        IF(_id IS NULL)
        THEN
            RETURN QUERY
            SELECT 404,
                   JSONB_BUILD_OBJECT
                   ('id', $1,
                    'constraint', 'account_exists',
                    'message',    'The account with the requested id does not exist.'
                   );
        ELSE
            RETURN QUERY
            SELECT 200,
                   JSONB_BUILD_OBJECT
                   ('id', a.id)
            FROM   account a
            WHERE  a.id = _id;
    END IF;

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
                 'id',         $1,
                 'data',       $2
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