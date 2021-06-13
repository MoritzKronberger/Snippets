import { query } from "./index.js";
//TODO: SQL Anfragen entsprechend der Methoden anpassen?

const getPostsAll = async () => {
    const result = await query(``);
    return { status: 200, result: result.rows };
  },
  getPostSearch = async (key) => {
    const result = await query(``, [key]);
    return result.rows.length === 0
      ? { status: 404, result: {} }
      : { status: 200, result: result.rows };
  },
  getPosts = async (key) => {
    return key ? getPostSearch(key) : getPostsAll();
  },
  getPost = async (id) => {
    const result = await query(``, [id]);
    return result.rows.length === 0
      ? { status: 404, result: {} }
      : { status: 200, result: result.rows[0] };
  },
  postPost = async (data) => {
    const result = await query(``, [data]);
    return result.rows[0];
  },
  putPost = async (id, data) => {
    const result = await query(``, [id, data]);
    return result.rows[0];
  },
  patchPost = async (id, data) => {
    const result = await query(``, [id, data]);
    return result.rows[0];
  },
  deletePost = async (id) => {
    const result = await query(``, [id]);
    return result.rows[0];
  };

export { 
  getPosts, 
  getPost, 
  postPost, 
  putPost, 
  patchPost, 
  deletePost 
};

export default { 
  getPosts, 
  getPost, 
  postPost, 
  putPost, 
  patchPost, 
  deletePost 
};
