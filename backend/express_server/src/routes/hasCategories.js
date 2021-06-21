import Router from "express-promise-router";
import validate from "../schema/validate.js";
import hasCategoriesSchema from "../schema/hasCategory-schema.js";
import hasCategoriesDB from "../db/hasCategories.js";
import postsDB from "../db/posts.js";
import { isAuthorized } from "../util/auth.js";
import { refreshToken } from "./auth.js";

const hasCategories = Router();

hasCategories.post( "/", isAuthorized, validate({ body: hasCategoriesSchema }), refreshToken, async (req, res) => {
  let post = { status:"", result:"" };
  post = await postsDB.getPost(req.body.post_id);
  if (req.id !== post.result.user_id) {
    return res.sendStatus(401);
  }
    const { status, result } = await hasCategoriesDB.postHasCategory(
        req.body.post_id,
        req.body.category_id
      ),
      proxy = req.headers["x-forwarded-host"],
      host = proxy ? proxy : req.headers.host;
    res
      .set("Location", `${req.protocol}://${host}${req.baseUrl}/${result.id}`)
      .status(status)
      .json(result);
  }
);

hasCategories.delete("/", isAuthorized, refreshToken, async (req, res) => {
  let post = { status:"", result:"" };
  post = await postsDB.getPost(req.body.post_id);
  if (req.id !== post.result.user_id) {
    return res.sendStatus(401);
  }
  const { status, result } = await hasCategoriesDB.deleteHasCategory(
    req.body.post_id,
    req.body.category_id
  );

  res.status(status).json(result);
});

export { hasCategories, hasCategoriesSchema };

export default { hasCategories, hasCategoriesSchema };
