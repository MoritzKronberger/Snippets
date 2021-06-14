import { query } from "./index.js";
//TODO: SQL Anfragen entsprechend der Methoden anpassen?

const getCategoriesAll = async () => {
    const result = await query(``);
    return { status: 200, result: result.rows };
  },
  getCategorySearch = async (key) => {
    const result = await query(``, [key]);
    return result.rows.length === 0
      ? { status: 404, result: {} }
      : { status: 200, result: result.rows };
  },
  getCategories = async (key) => {
    return key ? getCategorySearch(key) : getCategoriesAll();
  },
  getCategory = async (id) => {
    const result = await query(``, [id]);
    return result.rows.length === 0
      ? { status: 404, result: {} }
      : { status: 200, result: result.rows[0] };
  },
  postCategory = async (data) => {
    const result = await query(``, [data]);
    return result.rows[0];
  },
  putCategory = async (id, data) => {
    const result = await query(``, [id, data]);
    return result.rows[0];
  },
  patchCategory = async (id, data) => {
    const result = await query(``, [id, data]);
    return result.rows[0];
  },
  deleteCategory = async (id) => {
    const result = await query(``, [id]);
    return result.rows[0];
  };

export {
  getCategories,
  getCategory,
  postCategory,
  putCategory,
  patchCategory,
  deleteCategory,
};

export default {
  getCategories,
  getCategory,
  postCategory,
  putCategory,
  patchCategory,
  deleteCategory,
};
