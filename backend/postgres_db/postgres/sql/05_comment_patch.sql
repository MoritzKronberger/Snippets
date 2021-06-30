/*************************************************************************************
 * comment: PATCH function
 *************************************************************************************/

BEGIN;

/* CLEANUP */
DROP FUNCTION IF EXISTS patch_comment(_id UUID, _data JSONB);

/* Function */
CREATE FUNCTION patch_comment(_id UUID, _data JSONB)
    RETURNS TABLE (result JSONB)
LANGUAGE plpgsql
AS
$$
    BEGIN
        RETURN QUERY
        SELECT rest_helper
        ('UPDATE comment c
          SET
             content = json_attr_value_not_null($2, ''content'', c.content)::TEXT
          WHERE c.id = $1',
          _id => _id, _data => _data, _constraint => 'comment_exists'
        );
    END;
$$
;

COMMIT;

/*
SELECT * FROM comment;
SELECT *
FROM patch_comment
     ((SELECT id FROM comment WHERE content = 'Nice code!'),
       '{"content": "Update: Nice code!"}')
;
SELECT * FROM comment;

SELECT * FROM comment;
SELECT *
FROM patch_comment
     ((SELECT id FROM comment WHERE content = 'Nice code!'),
       '{}')
;
SELECT * FROM comment;
*/
