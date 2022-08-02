const express = require("express")
const { register, login } = require("../controllers/AuthController")
const validateSchema = require("../validations/UserValidator")
const validate = require("../middlewares/validate")
const router = express.Router()

router.route("/register").post(validate(validateSchema.createValidation), register)
router.route("/login").post(validate(validateSchema.loginValidator), login)

module.exports = router