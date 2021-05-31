/* template from https://gitlab.multimedia.hs-augsburg.de/kowa/wk_account_express_01a */

import { query } from "./index.js";

const getAccountsAll = async () => {
    return [
      200,
      (
        await query(`SELECT id, username, profile_picture 
                     FROM   v_account
          `)
      ).rows,
    ];
  },

  getAccountSearch = async (key) => {
    const result = await query(
      `SELECT id, username, profile_picture
       FROM   v_account
       WHERE  username = $1::VARCHAR
      `,
      [key]
    );
    return result.rows.length === 0 ? [404, {}] : [200, result.rows[0]];
  },

  getAccounts = async (key) => {
    return key ? getAccountSearch(key) : getAccountsAll();
  },

  getAccount = async (id) => {
    const result = await query(
      `SELECT id, username, profile_picture
       FROM   v_account
       WHERE  $1::UUID = id
      `,
      [id]
    );
    return result.rows.length === 0 ? [404, {}] : [200, result.rows[0]];
  },

  //TODO: check profile picture for accepted content? NOT $3::VARCHAR
  postAccount = async ({ username, password, profile_picture }) => {
    const result = await query(
      `INSERT INTO v_account(username, password, profile_picture)
       VALUES($1::VARCHAR, $2::VARCHAR, $3::BYTEA)
       RETURNING id
      `,
      [username, password, profile_picture]
    );
    return [201, result.rows[0]?.id];
  },

  //TODO: check profile_picture for accepted content
  putAccount = async (id, { username, password, profile_picture }) => {
    await query(
      `UPDATE account
       SET   username        = $2::VARCHAR,
             profile_picture = $3::BYTEA
       WHERE id = $1::UUID
      `,
      [id, username, profile_picture]
    );
    return 200;
  },

  patchAccount = async (id, { username, password, profile_picture }) => {
    await query(
      `UPDATE account
       SET   username        = COALESCE($2::VARCHAR, username),
             profile_picture = COALSECE($3::BYTEA, profile_picture)
       WHERE id = $1::UUID
      `,
      [id, username, profile_picture]
    );
    return 200;
  },
  
  deleteAccount = async (id) => {
    const result = await query(
      `DELETE 
       FROM  v_account
       WHERE id = $1::UUID
       RETURNING *
      `,
      [id]
    );
    return result.rows[0] ? 200 : 204;
  };

export {
  getAccounts,
  postAccount,
  getAccount,
  putAccount,
  patchAccount,
  deleteAccount,
};
