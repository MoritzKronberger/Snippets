import { query } from "./index.js";

// TODO: limit für returned rows?
const getPostsAll = async () => {
    const result = await query(
      `SELECT id, creation_time, title, content, language, user_id, username, profile_picture, num_likes, num_comments, categories
       FROM get_full_post
      `);
    return { status: 200, result: result.rows };
  },
  // TODO: weniger hacky implementieren?
  getPostSorted = async (key) => {
    const view = await query(
      `SELECT view_name
       FROM get_sort_by_view_name
       WHERE view_name = $1::UUID
       `, 
      [key]
    );
    const result = await query(
      `SELECT sort_rank, id, creation_time, title, content, language, user_id, username, profile_picture, num_likes, num_comments, categories
       FROM $1
      `, 
      [view.rows[0]]
    );
    return result.rows.length === 0
      ? { status: 404, result: {} }
      : { status: 200, result: result.rows };
  },
  getPosts = async (key) => {
    return key ? getPostSorted(key) : getPostsAll();
  },
  getPost = async (id) => {
    const result = await query(
      `SELECT id, user_id
       FROM get_post
       WHERE id = $1::UUID
      `, 
      [id]
    );
    return result.rows.length === 0
      ? { status: 404, result: {} }
      : { status: 200, result: result.rows[0] };
  },
  getPostSearch = async (data) => {
    const result = await query(
      `
      `, 
      [data]
    );
    return result.rows;
  },
  postPost = async (data) => {
    const result = await query(
      `SELECT status, result FROM post_post($1)`, 
      [data]
    );
    return result.rows[0];
  },
  putPost = async (id, data) => {
    const result = await query(
      `SELECT status, result FROM put_post($1, $2)`, 
      [id, data]
    );
    return result.rows[0];
  },
  patchPost = async (id, data) => {
    const result = await query(
      `SELECT status, result FROM patch_post($1, $2)`, 
      [id, data]
    );
    return result.rows[0];
  },
  deletePost = async (id) => {
    const result = await query(`SELECT status, result FROM delete_post($1)`, 
    [id]
  );
    return result.rows[0];
  };

export { 
  getPosts, 
  getPost, 
  getPostSearch,
  postPost, 
  putPost, 
  patchPost, 
  deletePost 
};

export default { 
  getPosts, 
  getPost, 
  getPostSearch,
  postPost, 
  putPost, 
  patchPost, 
  deletePost 
};
