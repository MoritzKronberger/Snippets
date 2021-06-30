import { query } from "./index.js";
//TODO: SQL Anfragen entsprechend der Methoden anpassen?

const getCategoriesAll = async () => {
    const result = await query(
      `SELECT id, name FROM get_category`
    );
    return { status: 200, result: result.rows };
  },
  getCategorySearch = async (key) => {
    const c_uuid_regex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
      result = key.match(c_uuid_regex)
        ? await query(
      `SELECT id, name
       FROM get_category
       WHERE id = $1::UUID
      `, 
      [key]
    )
    : await query(
      `SELECT id, name
       FROM get_category
       WHERE name = $1::D_UNTAINTED
       `,
       [key]
    );
    return result.rows.length === 0
      ? { status: 404, result: {} }
      : { status: 200, result: result.rows };
  },
  getCategories = async (key) => {
    return key ? getCategorySearch(key) : getCategoriesAll();
  },
  getCategory = async (id) => {
    const result = await query(
      `SELECT id, name
       FROM get_category
       WHERE id = $1::UUID
      `, [id]);
    return result.rows.length === 0
      ? { status: 404, result: {} }
      : { status: 200, result: result.rows[0] };
  },
  postCategory = async (data) => {
    const result = await query(`SELECT result FROM post_category($1)`, [data]);
    return result.rows[0];
  };

export {
  getCategories,
  getCategory,
  postCategory
};

export default {
  getCategories,
  getCategory,
  postCategory
};
