/* from https://gitlab.multimedia.hs-augsburg.de/kowa/wk_account_express_01a 
and https://gitlab.multimedia.hs-augsburg.de/kowa/wk_express_hello_world_01 */

import express from "express";
import cors from "cors";

import * as uuid from "uuid";

import { auth } from "./routes/auth.js";
import { accounts } from "./routes/accounts.js";
import { posts } from "./routes/posts.js";
import { comments } from "./routes/comments.js";
import { categories } from "./routes/categories.js";
import { hasCategories } from "./routes/hasCategories.js";
import { languages } from "./routes/languages.js";
import { userLikes } from "./routes/userLikes.js";
import { sorting } from "./routes/sorting.js";

import { ValidationError } from "express-json-validator-middleware";

const { PORT = 3000, SERVER = `http://localhost:${PORT}` } = process.env;
const c_app = express();
const c_uuid = uuid.v4;

c_app.use(express.json());

c_app.use("/v1/accounts", accounts);
c_app.use("/v1/posts", posts);
c_app.use("/v1/comments", comments);
c_app.use("/v1/categories", categories);
c_app.use("/v1/has-categories", hasCategories);
c_app.use("/v1/languages", languages);
c_app.use("/v1/user-likes", userLikes);
c_app.use("/v1/sorting", sorting);
c_app.use('/v1',          auth);

c_app.get("/v1/uuid", (req, res) => res.status(200).json(c_uuid()));

//c_app.get("/v1", (req, res) => res.status(200).json("hello world"));

c_app.use((error, req, res, next) => {
  if (error instanceof ValidationError) {
    res.status(400).send(error.validationErrors);
    next();
  } else {
    next(error);
  }
});

c_app.listen(PORT);

//c_app.use(cors());

console.log(`Running on ${SERVER}`);
