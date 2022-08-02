const httpStatus = require("http-status");
const { list, findOne, modify, remove } = require("../services/UserService");
const CustomError = require("../errors/CustomError");
const { passwordToHash } = require("../scripts/utils/authHelper");

const getAllUsers = async (req, res, next) => {
  try {
    let users = await list();
    const usersWithoutPassword = [];
    users.map((u) => {
      let user = {
        ...u.toObject(),
      };
      delete user.password;
      usersWithoutPassword.push(user);
    });
    return res.status(httpStatus.OK).json({
      success: true,
      message: "Users listed",
      data: usersWithoutPassword,
    });
  } catch (error) {
    return next(CustomError(error.message, httpStatus.INTERNAL_SERVER_ERROR));
  }
};

const getOneUser = async (req, res, next) => {
  try {
    let user = await findOne(req.params.id);
    if (!user) {
      return next(CustomError("User not found", httpStatus.NOT_FOUND));
    }
    // to remove password from user body
    user = {
      ...user.toObject(),
    };
    delete user.password;
    return res.status(httpStatus.OK).json({
      success: true,
      message: "User listed",
      data: user,
    });
  } catch (error) {
    return next(CustomError(error.message, httpStatus.INTERNAL_SERVER_ERROR));
  }
};

const updateUser = async (req, res, next) => {
  try {
    let updatedUser = await modify({ _id: req.params.id }, req.body);
    if (!updatedUser) {
      return next(CustomError("User not found", httpStatus.NOT_FOUND));
    }
    updatedUser = {
      ...updatedUser.toObject(),
    };
    delete updatedUser.password;
    return res.status(httpStatus.OK).json({
      success: true,
      message: "User updated",
      data: updatedUser,
    });
  } catch (error) {
    return next(CustomError(error.message, httpStatus.INTERNAL_SERVER_ERROR));
  }
};

const deleteUser = async (req, res, next) => {
  try {
    let deletedUser = await remove(req.params.id);
    if (!deletedUser) {
      return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(httpStatus.OK).json({
      success: true,
      message: "User deleted.",
    });
  } catch (error) {
    return next(CustomError(error.message, httpStatus.INTERNAL_SERVER_ERROR));
  }
};

const changePassword = async (req, res, next) => {
  try {
    if (!req.params.id) {
      return next(CustomError("user id missing", httpStatus.BAD_REQUEST));
    }
    req.body.password = passwordToHash(req.body.password);
    let updatedUser = await modify({ _id: req.user?._id }, req.body);
    if (!updatedUser) {
      return next(CustomError("User not found", httpStatus.NOT_FOUND));
    }
    return res.status(httpStatus.OK).json({
      success: true,
      message: "Password has been changed.",
    });
  } catch (error) {
    return next(CustomError(error.message, httpStatus.INTERNAL_SERVER_ERROR));
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
  changePassword,
};
