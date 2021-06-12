/*************************************************************************************
 * comment: POST function
 *************************************************************************************/

BEGIN;

/* Cleanup */
DROP FUNCTION IF EXISTS post_comment (data JSONB);

/* Function */
CREATE FUNCTION post_comment (data JSONB)
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
        INSERT INTO comment (content, user_id, post_id)
        VALUES (($1->>'content')::TEXT,
                ($1->>'user_id')::UUID,
                ($1->>'post_id')::UUID
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
SELECT * FROM post;
SELECT * FROM comment;
SELECT * 
FROM post_comment
     ('{ "content": "This comment was created via the sored function!",
         "user_id": "copy_here",
         "post_id": "copy_here"
       }');
SELECT * FROM comment;
*/
