/*************************************************************************************
 * post: POST function
 *************************************************************************************/

BEGIN;

/* Cleanup */
DROP FUNCTION IF EXISTS post_post (data JSONB);

/* Function */
CREATE FUNCTION post_post (data JSONB)
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
        INSERT INTO post (title, content, language_id, user_id)
        VALUES(($1->>'title')::VARCHAR,
               ($1->>'content')::TEXT,
               ($1->>'language_id')::UUID,
               ($1->>'user_id')::UUID
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
SELECT * FROM e_language;
SELECT * FROM post;
SELECT * 
FROM post_post
     ( '{ "title": "Created via stored function",
          "content": "This post was created via the stored function!",
          "language_id": "copy_here",
          "user_id": "copy_here"
        }'
     );
SELECT * FROM post;
*/
