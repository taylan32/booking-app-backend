const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
const CustomError = require("../errors/CustomError");

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; //  Bearer token
  if (!token) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      success: false,
      message: "You must login.",
    });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(httpStatus.FORBIDDEN).json({
        success: false,
        message: "Your session has expired.",
      });
    }
    req.user = user?._doc;
    next();
  });
};

const verifyAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(CustomError("Authorization denied.", httpStatus.FORBIDDEN));
  }
  next();
};

const verifyUser = (req, res, next) => {
  if (!(req.user._id === req.params.id || req.user.isAdmin)) {
    return next(CustomError("Authorization denied.", httpStatus.FORBIDDEN));
  } else {
    next()
  }
};

module.exports = {
  authenticate,
  verifyAdmin,
  verifyUser
};
