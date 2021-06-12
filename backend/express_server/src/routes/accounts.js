/* template: https://gitlab.multimedia.hs-augsburg.de/kowa/wk_account_express_01 */

import Router from "express-promise-router";
import validate from "../schema/validate.js";
import accountSchema from "../schema/account-schema.js";
import accountsDB from "../db/accounts.js";
import { isAuthorized, isAdmin } from "../util/auth.js";
import { refreshToken } from "./auth.js";

const accountRouter = Router();

accountRouter.get("/", isAuthorized, refreshToken, async (req, res) => {
  const { status, result } = await accountsDB.getAccounts(req.id);
  res.status(status).json(result);
});

accountRouter.post("/", isAuthorized, validate({ body: accountSchema }), refreshToken, async (req, res) => {
  const { status, result } = await accountsDB.postAccount(req.body),
  proxy = req.headers["x-forwarded-host"],
  host = proxy ? proxy : req.headers.host;
  res
    //TODO: statt ${result} lieber ${result.id} ? hier id anzeigen lassen!
    .set("Location", `${req.protocol}://${host}${req.baseUrl}/${result.id}`)
    .status(status)
    .json(result);
});

accountRouter.get("/:id", isAuthorized, refreshToken, async (req, res) => {
  if (req.id !== req.params.id) {
    return res.sendStatus(401);
  }

  const { status, result } = await accountsDB.getAccount(req.params.id);

  if (status === 200) {
    res.status(status).json(result);
  } else {
    res.sendStatus(status);
  }
});

accountRouter.put("/:id", isAuthorized, validate({ body: accountSchema }), refreshToken, async (req, res) => {
  if (req.id !== req.params.id) {
    return res.sendStatus(401);
  }
  const { status, result } = await accountsDB.putAccount(
    req.params.id,
    req.body
  );
  res.status(status).json(result);
});

accountRouter.patch("/:id", isAuthorized, validate({ body: accountSchema }), refreshToken, async (req, res) => {
  if (req.id !== req.params.id) {
    return res.sendStatus(401);
  }
  const { status, result } = await accountsDB.patchAccount(
    req.params.id,
    req.body
  );
  res.status(status).json(result);
});

accountRouter.delete("/:id", isAuthorized, refreshToken, async (req, res) => {
  if (req.id !== req.params.id) {
    return res.sendStatus(401);
  }
  const { status, result } = await accountsDB.deleteAccount(
    req.params.id,
    req.body
  );
  res.status(status).json(result);
});

export { accounts, accountSchema };

export default { accounts, accountSchema };
