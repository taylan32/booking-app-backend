const express = require("express");
const router = express.Router();
const userRoute = require("./UserRoute");
const authRoute = require("./AuthRoute");
const hotelRoute = require("./HotelRoute");
const cityRoute = require("./CityRoute");
const hotelTypeRoute = require("./HotelTypeRoute");
const roomRoute = require("./RoomRoute");

router.use("/users", userRoute);
router.use("/auth", authRoute);
router.use("/hotels", hotelRoute);
router.use("/cities", cityRoute);
router.use("/hoteltypes", hotelTypeRoute);
router.use("/rooms", roomRoute);
module.exports = router;
