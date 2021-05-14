const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "No token,authorization denied" });
  }
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    if (decoded.user.role !== "User" && decoded.user.role !== "Admin") {
      return res
        .status(401)
        .json({ errors: [{ msg: "You are not authorized" }] });
    }
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
