import Router from "express-promise-router";
import validate from "../schema/validate.js";
import commentSchema from "../schema/comment-schema.js";
import commentsDB from "../db/comments.js";
import { isAuthorized } from "../util/auth.js";
import { refreshToken } from "./auth.js";

const comments = Router();

comments.get("/", refreshToken, async (req, res) => {
  const { status, result } = await commentsDB.getComments(req.query.search);
  res.status(status).json(result);
});

comments.post("/:post_id", isAuthorized, validate({ body: commentSchema }), refreshToken, async (req, res) => {
	const j = {
		content: req.body.content,
		user_id: req.id,
		post_id: req.params.post_id,
	};
	const { result } = await commentsDB.postComment(j),
		proxy = req.headers["x-forwarded-host"],
		host = proxy ? proxy : req.headers.host;
	res
		.set("Location", `${req.protocol}://${host}${req.baseUrl}/${result.id}`)
		.status(result.status)
		.json(result);
});

comments.get("/:id", refreshToken, async (req, res) => {
  const { status, result } = await commentsDB.getComment(req.params.id);

  if (status === 200) {
    res.status(status).json(result);
  } else {
    res.sendStatus(status);
  }
});

comments.patch("/:id", isAuthorized, validate({ body: commentSchema }), refreshToken, async (req, res) => {
  let comment = { status: "", result: "" };
  comment = await commentsDB.getComment(req.params.id);
	if (req.id !== comment.result.user_id) {
			return res.sendStatus(401);
	}

	const { result } = await commentsDB.patchComment(req.params.id, req.body);
	res.status(result.status).json(result);
});

comments.delete("/:id", isAuthorized, refreshToken, async (req, res) => {
  let comment = { status: "", result: "" };
  comment = await commentsDB.getComment(req.params.id);
  if (req.id !== comment.result.user_id) {
    return res.sendStatus(401);
  }

  const { result } = await commentsDB.deleteComment(req.params.id, req.body);
  res.status(result.status).json(result);
});

export { comments, commentSchema };

export default { comments, commentSchema };
