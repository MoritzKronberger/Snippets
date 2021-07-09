import { query } from "./index.js";

const getLikesAll = async () => {
    const result = await query(`SELECT "id", "user_id", "subject_id" FROM get_like`);
    return { status: 200, result: result.rows };
  },
  // TODO: suche nach user_id AND subject_id? (return true/false?)
  getLikeSearch = async (key) => {
    const uuid_regex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
      result = key.match(uuid_regex)
        ? await query(
            `SELECT "id", "user_id", "subject_id"
             FROM get_like
             WHERE id = $1::UUID
            `,
            [key]
          )
        : await query(
            `SELECT "id", "user_id", "subject_id"
             FROM get_like
             WHERE "user_id" = $1::UUID OR "subject_id" = $1::UUID
            `,
            [key]
          );
    return result.rows.length === 0
      ? { status: 404, result: {} }
      : { status: 200, result: result.rows };
  },
  getLikes = async (key) => {
    return key ? getLikeSearch(key) : getLikesAll();
  },
  getLike = async (id) => {
    const result = await query(
      `SELECT "id", "user_id", "subject_id"
       FROM get_like
       WHERE "id" = $1::UUID
      `,
      [id]
    );
    return result.rows.length === 0
      ? { status: 404, result: {} }
      : { status: 200, result: result.rows[0] };
  },
  postLike = async (data) => {
    const result = await query(`SELECT "result" FROM post_like($1)`, [data]);
    return result.rows[0];
  },
  deleteLike = async (data) => {
    const result = await query(`SELECT "result" FROM delete_like($1)`, [data]);
    return result.rows[0];
  };

export { getLikes, getLike, postLike, deleteLike };

export default {
  getLikes,
  getLike,
  postLike,
  deleteLike,
};
