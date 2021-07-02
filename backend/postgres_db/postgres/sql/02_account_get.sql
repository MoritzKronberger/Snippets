/*************************************************************************************
 * account: GET view
 *************************************************************************************/

BEGIN;

/* Cleanup */
DROP VIEW IF EXISTS get_account;

/* View */
CREATE VIEW get_account (id, username)
AS
SELECT id, username
FROM account
;

COMMIT;
