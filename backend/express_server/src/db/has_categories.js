import { query } from "./index.js";
//TODO: SQL Anfragen entsprechend der Methoden anpassen?

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
  postHasCategory = async (data) => {
    const result = await query(``, [data]);
    return result.rows[0];
  },
  putHasCategory = async (id, data) => {
    const result = await query(``, [id, data]);
    return result.rows[0];
  },
  patchHasCategory = async (id, data) => {
    const result = await query(``, [id, data]);
    return result.rows[0];
  },
  deleteHasCategory = async (id) => {
    const result = await query(``, [id]);
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
