/*************************************************************************************
 * has_category: POST function
 *************************************************************************************/
BEGIN;

/* Cleanup */
DROP FUNCTION IF EXISTS post_has_category (p_id UUID, c_id UUID);

/* Function */
CREATE FUNCTION post_has_category (p_id UUID, c_id UUID)
    RETURNS TABLE (status INTEGER, result JSONB)
LANGUAGE plpgsql
AS
$$
    DECLARE
        _pid      UUID;
        _cid      UUID;
        _state   TEXT;
        _cname   TEXT;
        _message TEXT;
    BEGIN
        INSERT INTO has_category ("post_id", "category_id")
        VALUES ($1,$2)
        RETURNING "post_id", "category_id" INTO _pid, _cid;

        RETURN QUERY
        SELECT 201, JSONB_BUILD_OBJECT('post_id', _pid,
                                       'category_id', _cid);

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
SELECT * FROM post;
SELECT * FROM e_category;
SELECT * FROM has_category;
SELECT * FROM post_has_category( 'post_id', 'category_id');
SELECT * FROM has_category;
*/
