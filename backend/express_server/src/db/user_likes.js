import { query } from "./index.js";
//TODO: SQL Anfragen entsprechend der Methoden anpassen?

const getLikesAll = async () => {
    const result = await query(``);
    return { status: 200, result: result.rows };
  },
  getLikeSearch = async (key) => {
    const result = await query(``, [key]);
    return result.rows.length === 0
      ? { status: 404, result: {} }
      : { status: 200, result: result.rows };
  },
  getLikes = async (key) => {
    return key ? getLikeSearch(key) : getLikesAll();
  },
  getLike = async (id) => {
    const result = await query(``, [id]);
    return result.rows.length === 0
      ? { status: 404, result: {} }
      : { status: 200, result: result.rows[0] };
  },
  postLike = async (data) => {
    const result = await query(``, [data]);
    return result.rows[0];
  },
  putLike = async (id, data) => {
    const result = await query(``, [id, data]);
    return result.rows[0];
  },
  patchLike = async (id, data) => {
    const result = await query(``, [id, data]);
    return result.rows[0];
  },
  deleteLike = async (id) => {
    const result = await query(``, [id]);
    return result.rows[0];
  };

export { 
  getLikes, 
  getLike, 
  postLike, 
  putLike, 
  patchLike, 
  deleteLike 
};

export default { 
  getLikes, 
  getLike, 
  postLike, 
  putLike, 
  patchLike, 
  deleteLike 
};
