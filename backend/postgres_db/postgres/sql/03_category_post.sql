/*************************************************************************************
 * category: POST function
 * as in https://gitlab.multimedia.hs-augsburg.de/kowa/wk_account_postgres_01

 * modified to not error out when posting duplicates
 *************************************************************************************/

BEGIN;

/* Cleanup */
DROP FUNCTION IF EXISTS post_category (_data JSONB);

/* Function */
-- returns the matching id and status 301 if the category name already exists
-- otherwise a new category is created and the new id and status 201 are returned
CREATE FUNCTION post_category (_data JSONB)
    RETURNS TABLE (result JSONB)
LANGUAGE plpgsql
AS
$$
    DECLARE
        _id UUID;
    BEGIN
        BEGIN
            _id = (SELECT "id" FROM e_category WHERE "name" = (_data->>'name')::D_CATEGORY);
            EXCEPTION WHEN OTHERS THEN
                _id = NULL;
        END;
        BEGIN
            IF(_id IS NOT NULL)
            THEN
                RETURN QUERY
                SELECT json_status(301,
                                   _id,
                                   '23505',
                                   'e_category_unique_name',
                                   'a category with the submitted name already exists',
                                   _data);
            ELSE
                RETURN QUERY
                SELECT rest_helper
                ('INSERT INTO e_category ("name")
                  VALUES (($2->>''name'')::D_CATEGORY)',
                 _data => _data, _http_status => 201
                );
            END IF;
        END;
    END;
$$
;

COMMIT;

/*
SELECT * FROM e_category;
SELECT * FROM post_category('{"name": "query"}');
SELECT * FROM e_category;
*/
