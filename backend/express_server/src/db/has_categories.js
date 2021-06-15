import { query } from "./index.js";
//TODO: SQL Anfragen entsprechend der Methoden anpassen?

// has_category get queries nötig?
const getHasCategoriesAll = async () => {
    const result = await query(``);
    return { status: 200, result: result.rows };
  },
  getHasCategorySearch = async (key) => {
    const result = await query(``, [key]);
    return result.rows.length === 0
      ? { status: 404, result: {} }
      : { status: 200, result: result.rows };
  },
  getHasCategories = async (key) => {
    return key ? getHasCategorySearch(key) : getHasCategoriesAll();
  },
  getHasCategory = async (id) => {
    const result = await query(``, [id]);
    return result.rows.length === 0
      ? { status: 404, result: {} }
      : { status: 200, result: result.rows[0] };
  },
  postHasCategory = async (p_id, c_id) => {
    const result = await query(
      `SELECT status, result FROM post_has_category($1, $2)`, 
      [p_id, c_id]
    );
    return result.rows[0];
  },
  // has_category put nötig?
  putHasCategory = async (id, data) => {
    const result = await query(``, [id, data]);
    return result.rows[0];
  },
  // has_category patch nötig?
  patchHasCategory = async (id, data) => {
    const result = await query(``, [id, data]);
    return result.rows[0];
  },
  deleteHasCategory = async (p_id, c_id) => {
    const result = await query(
      `SELECT status, result FROM delete_has_category($1, $2)`, 
      [p_id, c_id]
    );
    return result.rows[0];
  };

export {
  getHasCategories,
  getHasCategory,
  postHasCategory,
  putHasCategory,
  patchHasCategory,
  deleteHasCategory,
};

export default {
  getHasCategories,
  getHasCategory,
  postHasCategory,
  putHasCategory,
  patchHasCategory,
  deleteHasCategory,
};
