import Router from "express-promise-router";
import validate from "../schema/validate.js";
import postSchema from "../schema/post-schema.js";
import postsDB from "../db/posts.js";
import categoriesDB from "../db/categories.js";
import hasCategoriesDB from "../db/hasCategories.js";
import { isAuthorized } from "../util/auth.js";
import { refreshToken } from "./auth.js";

const posts = Router();

posts.get("/", async (req, res) => {
  const { status, result } = await postsDB.getPosts();
  res.status(status).json(result);
});

//TODO: add categories
posts.post("/", isAuthorized, validate({ body: postSchema }), refreshToken, async (req, res) => {
    //add a new post
    const json = {
      title: req.body.title,
      content: req.body.content,
      language_id: req.body.language_id,
      user_id: req.id,
    };
    let post = { status: "", result: "" },
      proxy = req.headers["x-forwarded-host"],
      host = proxy ? proxy : req.headers.host;
    post = await postsDB.postPost(json);
    res
      .set(
        "Location",
        `${req.protocol}://${host}${req.baseUrl}/${post.status.id}`
      )
      .status(post.status)
      .json(post.result);

    //look for the category
    let category = { status: "", result: "" };
    category = await categoriesDB.getCategories(req.body.category);
    let category_id;
    //200: category already existing, use id
    if (category.status === 200) {
      category_id = category.result[0].id;
    } else {
      category = await categoriesDB.postCategory({ name: req.body.category });
      category_id = category.result.id;
    }
    //connect post and category
    let hasCat = { status: "", result: "" };
    (hasCat = await hasCategoriesDB.postHasCategory(
      post.result.id,
      category_id
    )),
      (proxy = req.headers["x-forwarded-host"]),
      (host = proxy ? proxy : req.headers.host);
});

posts.get("/:id", async (req, res) => {
  const { status, result } = await postsDB.getPost(req.params.id);

  if (status === 200) {
    res.status(status).json(result);
  } else {
    res.sendStatus(status);
  }
});

posts.put( "/:id", isAuthorized, validate({ body: postSchema }), refreshToken, async (req, res) => {
    let post = { status: "", result: "" };
    post = await postsDB.getPost(req.params.id);
    if (req.id !== post.result.user_id) {
      return res.sendStatus(401);
    }

    post = await postsDB.putPost(req.params.id, req.body);
    res.status(post.status).json(post.result);
  }
);

posts.patch( "/:id", isAuthorized, validate({ body: postSchema }), refreshToken,
  async (req, res) => {
    let post = { status: "", result: "" };
    post = await postsDB.getPost(req.params.id);
    if (post.status === 404) {
      return res.sendStatus(post.status);
    }
    if (req.id !== post.result.user_id) {
      return res.sendStatus(401);
    }

    post = await postsDB.patchPost(req.params.id, req.body);
    res.status(post.status).json(post.result);
  }
);

posts.delete("/:id", isAuthorized, refreshToken, async (req, res) => {
  let post = { status, result };
  post = await postsDB.getPost(req.params.id);
  if (req.id !== result.user_id) {
    return res.sendStatus(401);
  }

  post = await postsDB.deletePost(req.params.id, req.body);
  res.status(status).json(result);
});

export { posts, postSchema };

export default { posts, postSchema };
