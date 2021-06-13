import { query } from "./index.js";
//TODO: SQL Anfragen entsprechend der Methoden anpassen?

const getLanguagesAll = async () => {
    const result = await query(``);
    return { status: 200, result: result.rows };
  },
  getLanguageSearch = async (key) => {
    const result = await query(``, [key]);
    return result.rows.length === 0
      ? { status: 404, result: {} }
      : { status: 200, result: result.rows };
  },
  getLanguages = async (key) => {
    return key ? getLanguageSearch(key) : getLanguagesAll();
  },
  getLanguage = async (id) => {
    const result = await query(``, [id]);
    return result.rows.length === 0
      ? { status: 404, result: {} }
      : { status: 200, result: result.rows[0] };
  },
  postLanguage = async (data) => {
    const result = await query(``, [data]);
    return result.rows[0];
  },
  putLanguage = async (id, data) => {
    const result = await query(``, [id, data]);
    return result.rows[0];
  },
  patchLanguage = async (id, data) => {
    const result = await query(``, [id, data]);
    return result.rows[0];
  },
  deleteLanguage = async (id) => {
    const result = await query(``, [id]);
    return result.rows[0];
  };

export {
  getLanguages,
  getLanguage,
  postLanguage,
  putLanguage,
  patchLanguage,
  deleteLanguage,
};

export default {
    getLanguages,
    getLanguage,
    postLanguage,
    putLanguage,
    patchLanguage,
    deleteLanguage,
  };