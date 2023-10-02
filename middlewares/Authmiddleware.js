const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
  const token = req.headers["Token-DocsAI"];
  let verified;

  try {
    verified = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(400).send({
      status: 400,
      message: "JWT not provided. Please login",
      data: err,
    });
  }

  if (verified) {
    req.locals = verified;
    next();
  } else {
    res.status(401).send({
      status: 401,
      message: "User not authenticated. Please login",
    });
  }
};

module.exports = { isAuth };