import { query } from "./index.js";

const getLanguagesAll = async () => {
    const result = await query(`SELECT "id", "name" FROM get_language`);
    return { status: 200, result: result.rows };
  },
  getLanguageSearch = async (key) => {
    const uuid_regex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
      result = key.match(uuid_regex)
        ? await query(
            `SELECT "id", "name" 
             FROM get_language
             WHERE "id" = $1::UUID
            `,
            [key]
          )
        : await query(
            `SELECT "id", "name" 
             FROM get_language
             WHERE "name" = $1::D_UNTAINTED
            `,
            [key]
          );
    return result.rows.length === 0
      ? { status: 404, result: {} }
      : { status: 200, result: result.rows };
  },
  getLanguages = async (key) => {
    return key ? getLanguageSearch(key) : getLanguagesAll();
  },
  getLanguage = async (id) => {
    const result = await query(
      `SELECT "id", "name" 
       FROM get_language
       WHERE "id" = $1::UUID
      `,
      [id]
    );
    return result.rows.length === 0
      ? { status: 404, result: {} }
      : { status: 200, result: result.rows[0] };
  };

export { getLanguages, getLanguage };

export default {
  getLanguages,
  getLanguage,
};
