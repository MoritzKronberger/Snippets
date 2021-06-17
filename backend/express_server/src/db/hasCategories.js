import { query } from "./index.js";
//TODO: SQL Anfragen entsprechend der Methoden anpassen?

const postHasCategory = async (p_id, c_id) => {
    const result = await query(
      `SELECT status, result FROM post_has_category($1, $2)`, 
      [p_id, c_id]
    );
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
  postHasCategory,
  deleteHasCategory,
};

export default {
  postHasCategory,
  deleteHasCategory,
};
