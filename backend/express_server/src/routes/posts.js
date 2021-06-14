import Router from "express-promise-router";
import validate from "../schema/validate.js";
import postSchema from "../schema/post-schema.js";
import postsDB from "../db/posts.js";
import { isAuthorized } from "../util/auth.js";
import { refreshToken } from "./auth.js";

const posts = Router();

posts.get("/", async (req, res) => {
    const { status, result } = await postsDB.getPosts();
    res.status(status).json(result);
});


posts.post("/", isAuthorized, validate({ body: postSchema }), refreshToken, async (req, res) => {
    const j = { title: req.body.title, content: req.body.content, language_id: req.body.language_id, user_id: req.id };
    const { status, result } = await postsDB.postPost(j),
    proxy = req.headers["x-forwarded-host"],
    host = proxy ? proxy : req.headers.host;
    res
      .set("Location", `${req.protocol}://${host}${req.baseUrl}/${status.id}`)
      .status(status)
      .json(result);
});

posts.get("/:id", async (req, res) => {
    const { status, result } = await postsDB.getPost(req.params.id);

    if (status === 200) {
        res.status(status).json(result);
    } else {
        res.sendStatus(status);
    }
});

posts.put("/id", isAuthorized, validate({ body: postSchema}), refreshToken, async (req, res) => {
    let post = { status, result };
    post = await postsDB.getPost(req.params.id);
    if (req.id !== result.user_id) {
        return res.sendStatus(401);
    }

    post = await postsDB.putPost(
        req.params.id,
        req.body
    );
    res.status(status).json(result);
});

posts.patch("/:id", isAuthorized, validate({ body: postSchema }), refreshToken, async (req, res) => {
    let post = { status:"", result:"" };
    console.log(post);
    post = await postsDB.getPost(req.params.id);
    console.log(post);
    if (post.status === 404) {
        return res.sendStatus(post.status)
    }
    if (req.id !== result.user_id) {
        return res.sendStatus(401);
    }

    post = await postsDB.patchPost(
        req.params.id,
        req.body
    );
    res.status(post.status).json(post.result);
});

posts.delete("/:id", isAuthorized, refreshToken, async (req, res) => {
    let post = { status, result };
    post = await postsDB.getPost(req.params.id);
    if (req.id !== result.user_id) {
        return res.sendStatus(401);
    }

    post = await postsDB.deletePost(
        req.params.id,
        req.body
    );
    res.status(status).json(result);
});

export { posts, postSchema };

export default { posts, postSchema };