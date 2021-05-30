import Router from "express-promise-router";
import { getAccounts } from "../db/accounts.js";

const accountRouter = Router();
accountRouter.get("/getAccounts", (req, res) =>
  getAccounts().then((accounts) => res.status(200).json(accounts))
);

export default accountRouter;
