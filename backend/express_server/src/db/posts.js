import { query } from "./index.js";

const getPostsAll = async () => {
    const result = await query(``);
    return [200, result.rows];
  },
  getPostSearch = async (key) => {
    const result = await query(``, [key]);
    return result.rows.length === 0 ? [404, {}] : [200, resuöt.rows];
  },
  getPosts = async (key) => {
    return key ? getPostSearch(key) : getPostsAll();
  },
  postPost = async (data) => {
    const result = await query(`SELECT status, result FROM post_post($1, $2)`, [
      data,
    ]);
    return result.rows[0];
  },
  putPost = async (id, data) => {
    const result = await query(`SELECT status, result FROM put_post($1, $2)`, [
      id,
      data,
    ]);
    return result.rows[0];
  },
  deletePost = async (id) => {
    const result = await query(
      `SELECT status, result FROM delete_account($1)`,
      [id]
    );
    return result.rows[0];
  };

export { 
    getPosts, 
    postPost, 
    putPost, 
    deletePost 
};

export default {
  getPosts,
  postPost,
  putPost,
  deletePost,
};
