import Router from "express-promise-router";
import validate from "../schema/validate.js";
import userLikeSchema from "../schema/userLike-schema.js";
import userLikesDB from "../db/userLikes.js";
import { isAuthorized } from "../util/auth.js";
import { refreshToken } from "./auth.js";

const userLikes = Router();

userLikes.get("/", isAuthorized, refreshToken, async (req, res) => {
// userLikes.get("/", async (req, res) => {
  const { status, result } = await userLikesDB.getLikes(req.query.search);
  res.status(status).json(result);
});

userLikes.post("/", isAuthorized, validate({ body: userLikeSchema }), refreshToken, async (req, res) => {
  const json = { user_id: req.id, post_id: req.body.post_id, comment_id: req.body.comment_id, subject_id: req.body.subject_id };
  const { result } = await userLikesDB.postLike(json),
    proxy = req.header["x-forwarded-host"],
    host = proxy ? proxy : req.headers.host;
  res
    .set("Location", `${req.protocol}://${host}${req.baseUrl}/${result.id}`)
    .status(result.status)
    .json(result);
});

userLikes.get("/:id", isAuthorized, refreshToken, async (req, res) => {
// userLikes.get("/:id", async (req, res) => {
  const { status, result } = await userLikesDB.getLike(req.params.id);

  if (status === 200) {
    res.status(status).json(result);
  } else {
    res.sendStatus(status);
  }
});

userLikes.delete("/:id", isAuthorized, refreshToken, async (req, res) => {
  let like = { result: "" };
  like = await userLikesDB.getLike(req.params.id);

  if (req.id !== like.result.user_id) {
    return res.sendStatus(401);
  }
  like = await userLikesDB.deleteLike(req.params.id);
  res.status(like.result.status).json(like.result);
});

export { userLikes, userLikeSchema };

export default { userLikes, userLikeSchema };
