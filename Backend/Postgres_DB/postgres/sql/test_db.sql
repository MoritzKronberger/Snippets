BEGIN;

DROP TABLE IF EXISTS test_table CASCADE;

CREATE TABLE test_table
(
    id       INTEGER     PRIMARY KEY,
    name     VARCHAR,
    message  VARCHAR
);

COMMIT;

BEGIN;

INSERT INTO test_table(id, name, message)
VALUES
(1, 'example name', 'I am an example!'),
(2, 'test name', 'I am a test!')
;

COMMIT;
