/*************************************************************************************
 * db_v1: Functions For REST
 * from https://gitlab.multimedia.hs-augsburg.de/kowa/wk_account_postgres_01

 * rest_helper is modified to work with relationship tables
 *************************************************************************************/

BEGIN;

/* Cleanup */
DROP FUNCTION IF EXISTS rest_helper                          CASCADE;
DROP FUNCTION IF EXISTS json_status                          CASCADE;
DROP FUNCTION IF EXISTS json_attr_value                      CASCADE;
DROP FUNCTION IF EXISTS json_attr_value_not_null             CASCADE;
DROP FUNCTION IF EXISTS json_attr_value_d_untainted          CASCADE;
DROP FUNCTION IF EXISTS json_attr_value_not_null_d_untainted CASCADE;

/* Functions */

/* Extract JSON Attriubutes */
-- returns attribute value if attribute exists (returns NULL if attribute is NULL)
-- else returns default if attribute is not set
CREATE OR REPLACE FUNCTION json_attr_value(_data JSONB, _attr TEXT, _default TEXT)
    RETURNS TEXT
    IMMUTABLE PARALLEL SAFE
LANGUAGE SQL
AS
$$
    SELECT
    CASE WHEN _data ? _attr THEN (_data->>_attr)::TEXT ELSE _default END;
$$
;

-- returns attribute value if attribute is set and is not null
-- else returns default
CREATE OR REPLACE FUNCTION json_attr_value_not_null(_data JSONB, _attr TEXT, _default TEXT)
    RETURNS TEXT
    IMMUTABLE PARALLEL SAFE
LANGUAGE SQL
AS
$$
    SELECT
    CASE WHEN _data ? _attr AND _data->>_attr IS NOT NULL THEN (_data->>_attr)::TEXT ELSE _default END;
$$
;

-- returns trimmed value of attribute type D_UNTAINTED (returns NULL if attribute is NULL)
-- else returns default if attribute is not set
CREATE OR REPLACE FUNCTION json_attr_value_d_untainted(_data JSONB, _attr TEXT, _default D_UNTAINTED)
    RETURNS D_UNTAINTED
    IMMUTABLE PARALLEL SAFE
LANGUAGE SQL
AS 
$$
    SELECT
    CASE WHEN _data ? _attr
         THEN CASE WHEN _data->>_attr IS NULL THEN NULL
                   WHEN trim(_data->>_attr::TEXT) <> '' THEN trim(_data->>_attr)::D_UNTAINTED	
                   ELSE _default
              END 
         ELSE _default
    END;
$$
;

-- returns trimmed value of attribute type D_UNTAINTED if attr is set and is not null
-- else returns default
CREATE OR REPLACE FUNCTION json_attr_value_not_null_d_untainted(_data JSONB, _attr TEXT, _default D_UNTAINTED)
    RETURNS D_UNTAINTED
    IMMUTABLE PARALLEL SAFE
LANGUAGE SQL
AS 
$$
    SELECT 
    CASE WHEN _data ? _attr
         THEN CASE WHEN _data->>_attr IS NULL THEN _default
                   WHEN trim(_data->>_attr::TEXT) <> '' THEN trim(_data->>_attr)::D_UNTAINTED
                   ELSE _default
              END
         ELSE _default
    END;
$$
;

/* JSON STATUS */
CREATE OR REPLACE FUNCTION json_status(_status     INTEGER,
                                       _id         UUID,
                                       _pgstate    TEXT  DEFAULT '00000',
                                       _constraint TEXT  DEFAULT NULL,
                                       _message    TEXT  DEFAULT NULL,
                                       _data       JSONB DEFAULT NULL)
    RETURNS JSONB
    IMMUTABLE PARALLEL SAFE
LANGUAGE SQL
AS
$$
    SELECT JSONB_BUILD_OBJECT
           ('status', _status,
            'id', _id,
            'pgstate', _pgstate,
            'constraint', _constraint,
            'message', _message,
            'data', _data);
$$
;

/* REST HELPER */
-- !!
-- !! RELATIONSHIP FUNCTIONALITY ONLY WORKS FOR TABLES WITH JUST THE TWO IDS AS ATTRIBUTES !!
-- !!
-- returns id into id,  returns null for data             if _relationship is FALSE
-- returns null for id, returns both pk/fk ids into _data if _relationship is TRUE
CREATE OR REPLACE FUNCTION rest_helper(_sql               TEXT,
                                       _id                UUID    DEFAULT NULL,
                                       _data              JSONB   DEFAULT NULL,
                                       _constraint        TEXT    DEFAULT 'id exists',
                                       _postgres_status   TEXT    DEFAULT '02000',
                                       _http_status       INTEGER DEFAULT 200,
                                       _http_error_status INTEGER DEFAULT 400,
                                       _relationship      BOOLEAN DEFAULT FALSE)
    RETURNS TABLE (result JSONB)
LANGUAGE plpgsql
AS
$$
    DECLARE 
        _id_      UUID DEFAULT NULL;
        _pgstate_ TEXT;
        _cname_   TEXT;
        _message_ TEXT;
        _id1_     UUID DEFAULT NULL;
        _id2_     UUID DEFAULT NULL;
    
    BEGIN
        IF NOT _relationship
        THEN 
            EXECUTE _sql || ' RETURNING id' INTO _id_ USING _id, _data;
        ELSE
            EXECUTE _sql || ' RETURNING *' INTO _id1_, _id2_ USING _id, _data;
        END IF;

        IF (CASE WHEN _relationship THEN _id1_ ELSE _id_ END IS NOT NULL)
        THEN 
            RETURN QUERY
            SELECT json_status(_http_status, _id_, 
                               _data => CASE WHEN _relationship 
                                        THEN JSONB_BUILD_OBJECT('id1', _id1_, 'id2', _id2_)
                                        ELSE NULL
                                        END);
        ELSE 
            RETURN QUERY
            SELECT json_status(_http_error_status, _id_, _postgres_status, _constraint, _message_);
        END IF;

        EXCEPTION WHEN OTHERS THEN 
            GET STACKED DIAGNOSTICS
                _pgstate_ = RETURNED_SQLSTATE,
                _cname_   = CONSTRAINT_NAME,
                _message_ = MESSAGE_TEXT;
            RETURN QUERY
            SELECT json_status(400, 
                               _id, 
                               _pgstate_, 
                               CASE WHEN _cname_ <> '' THEN _cname_ ELSE _message_ END, 
                               _message_);
    END
$$
;

COMMIT;
