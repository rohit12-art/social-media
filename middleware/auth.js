const jwt = require("jsonwebtoken");
const User = require("../model/User");
const auth = async (req, res, next) => {
  const headerToken = req.headers.authorization;
  if (!headerToken) {
    return res.status(500).send("Please provide token");
  }
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(500).send("Authorization failed");
  }
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const exsitingUser = await User.findById(decodedToken.id);
    if (!exsitingUser) {
      return res.status(404).send("User not found.");
    }
    req.body.userId = decodedToken.id;
    next();
  } catch (err) {
    return res.status(500).send("Authorization failed");
  }
};

module.exports = auth;
