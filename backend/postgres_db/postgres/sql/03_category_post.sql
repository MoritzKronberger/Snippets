/*************************************************************************************
 * category: POST function
 *************************************************************************************/

BEGIN;

/* Cleanup */
DROP FUNCTION IF EXISTS post_category (data JSONB);

/* Function */
CREATE FUNCTION post_category (data JSONB)
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
        IF(EXISTS (SELECT id FROM e_category WHERE name = ($1->>'name')::D_UNTAINTED))
        THEN
            RETURN QUERY
            SELECT 303,
                   JSONB_BUILD_OBJECT
                   ('name', $1->>'name',
                    'id', ca.id,
                    'constraint', 'category_unique',
                    'message',    'The submitted category already exists.'
                   )
            FROM e_category ca
            WHERE ca.name = ($1->>'name')::D_UNTAINTED;
        ELSE
            INSERT INTO e_category (name)
            VALUES (($1->>'name')::D_UNTAINTED)
            RETURNING id INTO _id;

            RETURN QUERY
            SELECT 201, JSONB_BUILD_OBJECT('id', _id);
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
                  'data',       $1
                 );
    END;
$$
;

COMMIT;

/*
SELECT * FROM e_category;
SELECT * FROM post_category('{"name": "sql"}');
SELECT * FROM e_category;
*/
