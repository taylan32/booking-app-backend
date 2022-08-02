const express = require("express")
const router = express.Router()
const userRoute = require("./UserRoute")
const authRoute = require("./AuthRoute")

router.use("/users", userRoute)
router.use("/auth", authRoute)

module.exports = router