/*************************************************************************************
 * comment: PATCH function
 * as in https://gitlab.multimedia.hs-augsburg.de/kowa/wk_account_postgres_01
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
             "content" = json_attr_value_not_null_d_untainted($2, ''content'', c."content")
          WHERE c."id" = $1',
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
     ((SELECT "id" FROM comment WHERE content = 'Nice code!'),
      '{"content": "Update: Nice code!"}')
;
SELECT * FROM comment;

SELECT *
FROM patch_comment
     ((SELECT "id" FROM comment WHERE content = 'Update: Nice code!'),
      '{}')
;
SELECT * FROM comment;
*/
