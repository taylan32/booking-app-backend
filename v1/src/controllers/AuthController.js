const { createUser, loginUser } = require("../services/AuthService");
const {
  passwordToHash,
  generateAccessToken,
  generateRefreshToken,
} = require("../scripts/utils/authHelper");
const CustomError = require("../errors/CustomError");
const httpStatus = require("http-status");
const { findByEmail } = require("../services/UserService");

const register = async (req, res, next) => {
  try {
    req.body.password = passwordToHash(req.body.password);
    let user = findByEmail({ name: req.body.email });
    if (user != null) {
      return next(CustomError("Email already in use.", httpStatus.BAD_REQUEST));
    }
    await createUser(req.body);
    return res.status(httpStatus.CREATED).json({
      success: true,
      message: "User registered",
    });
  } catch (error) {
    return next(CustomError(error.message, httpStatus.INTERNAL_SERVER_ERROR));
  }
};

const login = async (req, res, next) => {
  try {
    req.body.password = passwordToHash(req.body.password);
    let user = await loginUser(req.body);
    if (!user) {
      return next(
        CustomError("Email or password is wrong."),
        httpStatus.UNAUTHORIZED
      );
    }
    user = {
      ...user.toObject(),
      tokens: {
        accessToken: generateAccessToken(user),
        refreshToken: generateRefreshToken(user),
      },
    };
    delete user.password;

    return res.status(httpStatus.OK).json({
      success: true,
      message: "Signed in",
      data: user,
    });
  } catch (error) {
    return next(CustomError(error.message, httpStatus.INTERNAL_SERVER_ERROR));
  }
};

module.exports = {
  register,
  login,
};
