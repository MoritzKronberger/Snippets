import { query } from "./index.js";

const postHasCategory = async (data) => {
    const result = await query(
      `SELECT "result" FROM post_has_category($1)`, 
      [data]
    );
    return result.rows[0];
  },
  deleteHasCategory = async (data) => {
    const result = await query(
      `SELECT "result" FROM delete_has_category($1)`, 
      [data]
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
