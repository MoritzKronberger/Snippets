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
  const json = { user_id: req.id, post_id: req.body.post_id, comment_id: req.body.comment_id };
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

userLikes.delete("/", isAuthorized, refreshToken, async (req, res) => {
  //req.id is substitute for checking if the person made the like, because you can only delete your own likes when you are logged in
  let id = req.body.comment_id || req.body.post_id;
  const json = { user_id: req.id, subject_id: id };
  const { result } = await userLikesDB.deleteLike(json);
  res.status(result.status).json(result);
});

export { userLikes, userLikeSchema };

export default { userLikes, userLikeSchema };
