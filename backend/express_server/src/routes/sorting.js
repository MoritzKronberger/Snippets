import Router from "express-promise-router";
import sortingsDB from "../db/sortings.js";
import { isAuthorized } from "../util/auth.js";
import { refreshToken } from "./auth.js";

const sortings = Router();

sortings.get("/", isAuthorized, refreshToken, async (req, res) => {
// sortings.get("/", async (req, res) => {
    const { status, result } = await sortingsDB.getSortings();
    res.status(status).json(result);
});

sortings.get("/:id", isAuthorized, refreshToken, async (req, res) => {
// sortings.get("/:id", async (req, res) => {
    const { status, result } = await sortingsDB.getSorting(req.params.id);

    if (status === 200) {
        res.status(status).json(result);
    } else {
        res.sendStatus(status);
    }
});

export { sortings };

export default { sortings };