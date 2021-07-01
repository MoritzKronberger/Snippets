import Router from "express-promise-router";
import validate from "../schema/validate.js";
import commentSchema from "../schema/comment-schema.js";
import commentsDB from "../db/comments.js";
import { isAuthorized } from "../util/auth.js";
import { refreshToken } from "./auth.js";

const comments = Router();

// comments.get("/", async (req, res) => {
comments.get("/", isAuthorized, refreshToken, async (req, res) => {
    const { status, result } = await commentsDB.getComments(req.query.search);
    res.status(status).json(result);
});

//TODO: get post_id via a get request? 
comments.post("/:post_id", isAuthorized, validate({ body: commentSchema }), refreshToken, async (req, res) => {
    const j = { content: req.body.content, user_id: req.id, post_id: req.params.post_id };
    const { result } = await commentsDB.postComment(j),
    proxy = req.headers["x-forwarded-host"],
    host = proxy ? proxy : req.headers.host;
    res
      .set("Location", `${req.protocol}://${host}${req.baseUrl}/${result.id}`)
      .status(result.status)
      .json(result);
});

comments.get("/:id", isAuthorized, refreshToken, async (req, res) => {
// comments.get("/:id", async (req, res) => {
    const { status, result } = await commentsDB.getComment(req.params.id);

    if (status === 200) {
        res.status(status).json(result);
    } else {
        res.sendStatus(status);
    }
});

comments.put("/:id", isAuthorized, validate({ body: commentSchema }), refreshToken, async (req, res) => {
    let comment = { status:"", result:"" };
    comment = await commentsDB.getComment(req.params.id);
    if (req.id !== comment.result.user_id) {
        return res.sendStatus(401);
    }

    comment = await commentsDB.putComment(
        req.params.id,
        req.body
    );
    res.status(comment.status).json(comment.result);
});

comments.patch("/:id", isAuthorized, validate({ body: commentSchema }), refreshToken, async (req, res) => {
    let comment = { result:"" };
    comment = await commentsDB.getComment(req.params.id);
    if (req.id !== comment.result.user_id) {
        return res.sendStatus(401);
    }

    comment = await commentsDB.patchComment(
        req.params.id,
        req.body
    );
    res.status(comment.result.status).json(comment.result);
});

comments.delete("/:id", isAuthorized, refreshToken, async (req, res) => {
    //TODO: user des posts kann diesen ebenfalls löschen
    let comment = { result:"" };
    comment = await commentsDB.getComment(req.params.id);
    if (req.id !== comment.result.user_id) {
        return res.sendStatus(401);
    }

    comment = await commentsDB.deleteComment(
        req.params.id,
        req.body
    );
    res.status(comment.result.status).json(comment.result);
});

export { comments, commentSchema };

export default { comments, commentSchema };
