const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
  const tokenstring = req.headers["token-docsai"];  //Get the JWT token from API call Headers
  const token = tokenstring.split(' ')[1];
  console.log(token);
  let verified;

  try {
    verified = jwt.verify(token, process.env.JWT_SECRET); //Verification of JWT token if success it returns Payload data object else throws error
  } catch (err) {
    return res.status(400).send({
      status: 400,
      message: "JWT not provided. Please login",
      data: err,
    });
  }

  if (verified) {
    req.locals = verified;  //Adding the Payload data object received from verified to Request(req.locals) to that particular request.
                            //This is added to req because,curretly we are in Middleware.After the middleware we can use the Payload data.
    next();
  } else {
    res.status(401).send({
      status: 401,
      message: "User not authenticated. Please login",
    });
  }
};

module.exports = { isAuth };