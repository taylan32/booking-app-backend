const express = require("express");
const {
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
  changePassword,
} = require("../controllers/UserController");
const {
  authenticate,
  verifyAdmin,
  verifyUser,
} = require("../middlewares/authentication");
const validate = require("../middlewares/validate");
const validationSchema = require("../validations/UserValidator");
const router = express.Router();

router.route("/").get(authenticate, verifyAdmin, getAllUsers);

router.route("/:id").get(authenticate, verifyUser, getOneUser);

router
  .route("/:id")
  .patch(
    authenticate,
    verifyUser,
    validate(validationSchema.updateValidator),
    updateUser
  );

router.route("/:id").delete(authenticate, verifyUser, deleteUser);

router
  .route("/:id/change-password")
  .post(
    authenticate,
    verifyUser,
    validate(validationSchema.changePasswordValidator),
    changePassword
  );

module.exports = router;
