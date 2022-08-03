const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate");
const validationSchema = require("../validations/HotelValidator");
const { authenticate, verifyAdmin } = require("../middlewares/authentication");
const {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotels,
  getHotel,
  countByCity,
  countByType,
  getHotelRooms,
} = require("../controllers/HotelController");

router
  .route("/")
  .post(
    authenticate,
    verifyAdmin,
    validate(validationSchema.createHotelValidator),
    createHotel
  );

router
  .route("/:id")
  .patch(
    authenticate,
    verifyAdmin,
    validate(validationSchema.updateHotelValidator),
    updateHotel
  );

router.route("/:id").delete(authenticate, verifyAdmin, deleteHotel);

router.route("/").get(getHotels);
router.route("/find/:id").get(getHotel);
router.route("/countByCity").get(countByCity);
router.route("/countByType").get(countByType);
router.route("/room/:id").get(getHotelRooms);

module.exports = router;
