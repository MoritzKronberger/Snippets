/*************************************************************************************
 * account: GET view
 *************************************************************************************/

BEGIN;

/* Cleanup */
DROP VIEW IF EXISTS get_account;

/* View */
CREATE VIEW get_account (id, username, profile_picture)
AS
SELECT id, username, profile_picture
FROM account
;

COMMIT;
