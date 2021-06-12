/*************************************************************************************
 * comment: PUT function
 *************************************************************************************/

BEGIN;

/* Cleanup */
DROP FUNCTION IF EXISTS put_comment(id UUID, data JSONB);

/* FUNCTION */
CREATE FUNCTION put_comment(id UUID, data JSONB)
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
        UPDATE comment c
        SET
            content = COALESCE(($2->>'content')::TEXT, c.content)
        WHERE c.id = $1
        RETURNING c.id INTO _id;

        IF (_id IS NULL)
        THEN
            RETURN QUERY
            SELECT 404,
                JSONB_BUILD_OBJECT
                ('id',          $1,
                 'constraint', 'comment_exists',
                 'message',    'The comment with the requested id does not exist.'
                );
        ELSE
            RETURN QUERY
            SELECT 200,
                   JSONB_BUILD_OBJECT
                   ('id', c.id)
            FROM   comment c
            WHERE  c.id = $1;
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
SELECT * FROM comment;
SELECT *
FROM put_comment
     ((SELECT id FROM comment WHERE content = 'Nice code!'),
       '{"content": "Update: Nice code!"}')
;
SELECT * FROM comment;
*/
