import { query } from "./index.js";

// TODO: limit für returned rows?
const getCommentsAll = async () => {
    const result = await query(
      `SELECT "id", "creation_time", "content", "post_id", "user_id", "username", "num_likes"
       FROM get_full_comment
      `
    );
    return { status: 200, result: result.rows };
  },
  getCommentSearch = async (key) => {
    const result = await query(
      `SELECT "id", "creation_time", "content", "post_id", "user_id", "username", "num_likes"
       FROM get_full_comment
       WHERE "id" = $1::UUID OR "user_id" = $1::UUID
      `, 
      [key]
    );
    return result.rows.length === 0
      ? { status: 404, result: {} }
      : { status: 200, result: result.rows };
  },
  getComments = async (key) => {
    return key ? getCommentSearch(key) : getCommentsAll();
  },
  getComment = async (id) => {
    const result = await query(
      `SELECT "id", "creation_time", "content", "post_id", "user_id", "username", "num_likes"
       FROM get_full_comment
       WHERE "id" = $1::UUID
      `, 
      [id]
    );
    return result.rows.length === 0
      ? { status: 404, result: {} }
      : { status: 200, result: result.rows[0] };
  },
  postComment = async (data) => {
    const result = await query(
      `SELECT "result" FROM post_comment($1)`, 
      [data]
    );
    return result.rows[0];
  },
  patchComment = async (id, data) => {
    const result = await query(
      `SELECT "result" FROM patch_comment($1, $2)`,
      [id, data]
    );
    return result.rows[0];
  },
  deleteComment = async (id) => {
    const result = await query(
      `SELECT "result" FROM delete_comment($1)`, 
      [id]
    );
    return result.rows[0];
  };

export {
  getComments,
  getComment,
  postComment,
  patchComment,
  deleteComment,
};

export default {
  getComments,
  getComment,
  postComment,
  patchComment,
  deleteComment,
};
