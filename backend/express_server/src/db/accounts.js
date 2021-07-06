/* template from https://gitlab.multimedia.hs-augsburg.de/kowa/wk_account_postgres_01 */

import { query } from "./index.js";

const getAccountsAll = async () => {
    console.log("getAccountsAll");
    const result = await query(
      `SELECT id, username FROM get_account`
    );
    return { status: 200, result: result.rows };
  },
  getAccountSearch = async (key) => {
    const c_uuid_regex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
      result = key.match(c_uuid_regex)
        ? await query(
            `SELECT id, username
             FROM   get_account
             WHERE  id = $1::UUID
            `,
            [key]
          )
        : await query(
            `SELECT id, username
             FROM   get_account
             WHERE  username = $1::VARCHAR`,
            [key]
          );
    return result.rows.length === 0
      ? { status: 404, result: {} }
      : { status: 200, result: result.rows[0] };
  },
  getAccounts = async (key) => {
    return key ? getAccountSearch(key) : getAccountsAll();
  },
  getAccount = async (id) => {
    const result = await query(
      `SELECT id, username
       FROM   get_account
       WHERE  $1::UUID = id
      `,
      [id]
    );
    return result.rows.length === 0
      ? { status: 404, result: {} }
      : { status: 200, result: result.rows[0] };
  },
  postAccount = async (data) => {
    const result = await query(`SELECT result FROM post_account($1)`, [
      data,
    ]);
    return result.rows[0];
  },
  patchAccount = async (id, data) => {
    const result = await query(
      `SELECT result FROM patch_account($1, $2)`,
      [id, data]
    );
    return result.rows[0];
  },
  deleteAccount = async (id) => {
    const result = await query(
      `SELECT result FROM delete_account($1)`,
      [id]
    );
    return result.rows[0];
  };

export {
  getAccounts,
  postAccount,
  getAccount,
  patchAccount,
  deleteAccount,
};

export default {
  getAccounts,
  postAccount,
  getAccount,
  patchAccount,
  deleteAccount,
};
