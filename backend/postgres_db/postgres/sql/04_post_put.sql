/*************************************************************************************
 * post: PUT function
 *************************************************************************************/

BEGIN;

/* Cleanup */
DROP FUNCTION IF EXISTS put_post(id UUID, data JSONB);

/* FUNCTION */
CREATE FUNCTION put_post(id UUID, data JSONB)
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
        UPDATE post p
        SET 
            title       = COALESCE(($2->>'title')::VARCHAR,    p.title),
            content     = COALESCE(($2->>'content')::TEXT,     p.content),
            language_id = COALESCE(($2->>'language_id')::UUID, p.language_id)
        WHERE p.id = $1
        RETURNING p.id INTO _id;

        IF (_id IS NULL)
        THEN
            RETURN QUERY
            SELECT 404,
                JSONB_BUILD_OBJECT
                ('id',          $1,
                 'constraint', 'post_exists',
                 'message',    'The post with the requested id does not exist.'
                );
        ELSE
            RETURN QUERY
            SELECT 200,
                   JSONB_BUILD_OBJECT
                   ('id', p.id)
            FROM   post p
            WHERE  p.id = $1;
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
SELECT * FROM post;
SELECT * 
FROM put_post
     ((SELECT id FROM post WHERE title='My first post'),
      '{ "title":       "Not my first post anymore",
         "content":     "Update: Hello World!",
         "language_id": null
       }'
     );
SELECT * FROM post;
*/
