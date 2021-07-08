/* template: https://gitlab.multimedia.hs-augsburg.de/kowa/wk_account_express_01 */

import Router from "express-promise-router";
import express from "express";
import jwt from "jsonwebtoken";
import validate from "../schema/validate.js";
import accountSchema from "../schema/account-schema.js";
import accountsDB from "../db/accounts.js";
import { isNotAuthorized } from "../util/auth.js";
import dbAuth from "../db/auth.js";

const auth = Router(),
  {
    TOKEN_SECRET = "Please set the secret value in .env: TOKEN_SECRET=...",
    TOKEN_EXPIRES = 1800,
  } = process.env,
  refreshToken = (req, res, next) => {
    const token = jwt.sign({ id: req.id }, TOKEN_SECRET, {
      expiresIn: TOKEN_EXPIRES,
    });
    res.set("Authorization", `Bearer ${token}`);
    next();
  };

  auth.use(express.json());

auth.post("/login", isNotAuthorized, async (req, res) => {
  const { status, id } = await dbAuth.postLogin(req.body);
  if (status === 200) {
    const token = jwt.sign({ id }, TOKEN_SECRET, { expiresIn: TOKEN_EXPIRES });
    res
      .set("Authorization", `Bearer ${token}`)
      .status(status)
      .json({ message: "logged in" });
  } else {
    res.status(status).json({ message: "not logged in" });
  }
}),
// Two phase registering is still missing!
auth.post("/register", isNotAuthorized, validate({ body: accountSchema }), async (req, res) => {
    const { result } = await accountsDB.postAccount(req.body),
    proxy = req.headers["x-forwarded-host"],
    host = proxy ? proxy : req.headers.host;
    res
      .set("Location", `${req.protocol}://${host}${req.baseUrl}/${result.id}`)
      .status(result.status)
      .json(result.id);
    }
);

export { auth, refreshToken };

export default { auth, refreshToken };
