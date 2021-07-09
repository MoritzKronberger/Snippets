import Router from "express-promise-router";
import validate from "../schema/validate.js";
import categorySchema from "../schema/category-schema.js";
import categoryDB from "../db/categories.js";
import { isAuthorized } from "../util/auth.js";
import { refreshToken } from "./auth.js";

const categories = Router();

//URL looks like this: http://localhost:3000/v1/categories/?search=web
categories.get("/", refreshToken, async (req, res) => {
  const { status, result } = await categoryDB.getCategories(req.query.search);
  res.status(status).json(result);
});

categories.post( "/", isAuthorized, validate({ body: categorySchema }), refreshToken, async (req, res) => {
    const { result } = await categoryDB.postCategory(req.body),
      proxy = req.headers["x-forwarded-host"],
      host = proxy ? proxy : req.headers.host;
    res
      .set("Location", `${req.protocol}://${host}${req.baseUrl}/${result.id}`)
      .status(result.status)
      .json(result);
  }
);

categories.get("/:id", refreshToken, async (req, res) => {
  const { status, result } = await categoryDB.getCategory(req.params.id);

  if (status === 200) {
    res.status(status).json(result);
  } else {
    res.sendStatus(status);
  }
});

export { categories, categorySchema };

export default { categories, categorySchema };
