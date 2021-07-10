import Router from "express-promise-router";
import sortingsDB from "../db/sorting.js";
import { refreshToken } from "./auth.js";

const sorting = Router();

sorting.get("/", refreshToken, async (req, res) => {
  const { status, result } = await sortingsDB.getSortings();
  res.status(status).json(result);
});

sorting.get("/:id", refreshToken, async (req, res) => {
  const { status, result } = await sortingsDB.getSorting(req.params.id);

  if (status === 200) {
    res.status(status).json(result);
  } else {
    res.sendStatus(status);
  }
});

export { sorting };

export default { sorting };
