import { query } from "./index.js";
//TODO: SQL Anfragen entsprechend der Methoden anpassen?

const getCommentsAll = async () => {
    const result = await query(``);
    return { status: 200, result: result.rows };
  },
  getCommentSearch = async (key) => {
    const result = await query(``, [key]);
    return result.rows.length === 0
      ? { status: 404, result: {} }
      : { status: 200, result: result.rows };
  },
  getComments = async (key) => {
    return key ? getCommentSearch(key) : getCommentsAll();
  },
  getComment = async (id) => {
    const result = await query(``, [id]);
    return result.rows.length === 0
      ? { status: 404, result: {} }
      : { status: 200, result: result.rows[0] };
  },
  postComment = async (data) => {
    const result = await query(``, [data]);
    return result.rows[0];
  },
  putComment = async (id, data) => {
    const result = await query(``, [id, data]);
    return result.rows[0];
  },
  patchComment = async (id, data) => {
    const result = await query(``, [id, data]);
    return result.rows[0];
  },
  deleteComment = async (id) => {
    const result = await query(``, [id]);
    return result.rows[0];
  };

export {
  getComments,
  getComment,
  postComment,
  putComment,
  patchComment,
  deleteComment,
};

export default {
  getComments,
  getComment,
  postComment,
  putComment,
  patchComment,
  deleteComment,
};
