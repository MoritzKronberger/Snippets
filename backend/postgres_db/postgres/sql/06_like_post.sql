/*************************************************************************************
 * like: POST function
 *************************************************************************************/

BEGIN;

/* Cleanup */
DROP FUNCTION IF EXISTS post_like (data JSONB);

/* Function */
CREATE FUNCTION post_like (data JSONB)
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
        INSERT INTO user_like (user_id, post_id, comment_id)
        VALUES (($1->>'user_id')::UUID,
                CASE WHEN $1 ? 'post_id'    THEN ($1->>'post_id')::UUID    END,
                CASE WHEN $1 ? 'comment_id' THEN ($1->>'comment_id')::UUID END
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
SELECT * FROM user_like;
SELECT * 
FROM post_like
     ('{ "user_id": "copy_here",
         "post_id": "copy_here"
       }'
     );
SELECT * FROM user_like;

SELECT * FROM account;
SELECT * FROM comment;
SELECT * FROM user_like;
SELECT * 
FROM post_like
     ('{ "user_id":    "copy_here",
         "comment_id": "copy_here"
       }'
     );
SELECT * FROM user_like;
*/