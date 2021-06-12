/* template: https://gitlab.multimedia.hs-augsburg.de/kowa/wk_account_express_01 */

// see https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs
import jwt from "jsonwebtoken";

const {
  TOKEN_SECRET = "Please set the secret value in .env: TOKEN_SECRET=...",
} = process.env;

function isNotAuthorized(req, res, next) {
  if (req.headers["authorization"] == null) {
    next();
  } else {
    return res.status(400).json({ message: "already logged in" });
  }
}

function isAuthorized(req, res, next) {
  const c_auth_header = req.headers["authorization"];
  const c_token = c_auth_header && c_auth_header.split(" ")[1];

  if (c_token == null) {
    return res.status(401).json({ message: "not logged in" });
  }

  jwt.verify(c_token, TOKEN_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({ message: "not logged in" });
    }

    req.id = payload.id;
    next();
  });
}

export { isAuthorized, isNotAuthorized };

export default { isAuthorized, isNotAuthorized };
