import Router from "express-promise-router";
import languagesDB from "../db/languages.js";
import { isAuthorized } from "../util/auth.js";
import { refreshToken } from "./auth.js";

const languages = Router();
//TODO: Error message when typing in a uuid into the url

//no authorization because you have to get these to display a post with the right syntaxhighlighting
languages.get("/", isAuthorized, refreshToken, async (req, res) => {
// languages.get("/", async (req, res) => {
    const { status, result } = await languagesDB.getLanguages(req.query.search);
    res.status(status).json(result);
});

languages.get("/:id", isAuthorized, refreshToken, async (req, res) => {
// languages.get("/:id", async (req, res) => {
    const { status, result } = await languagesDB.getLanguage(req.params.id);

    if (status === 200) {
        res.status(status).json(result);
    } else {
        res.sendStatus(status);
    }
});

export { languages };

export default { languages };