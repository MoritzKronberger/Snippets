/*************************************************************************************
 * category: POST function
 *************************************************************************************/

BEGIN;

/* Cleanup */
DROP FUNCTION IF EXISTS post_category (_data JSONB);

/* Function */
CREATE FUNCTION post_category (_data JSONB)
    RETURNS TABLE (result JSONB)
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
            SELECT json_status
            (303,
             (SELECT id FROM e_category WHERE name = ($1->>'name')::D_UNTAINTED),
             _constraint => 'category_unique',
             _message => 'the requested category already exists'
            );
        ELSE
            RETURN QUERY
            SELECT rest_helper
            ('INSERT INTO e_category (name)
              VALUES (json_attr_value_d_untainted($2,''name'', NULL))',
              _data => _data, _http_status => 200
            );
        END IF;
    END;
$$
;

COMMIT;

/*
SELECT * FROM e_category;
SELECT * FROM post_category('{"name": "sql"}');
SELECT * FROM e_category;
*/
