const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate");
const validationSchema = require("../validations/HotelTypeValidator");
const { authenticate, verifyAdmin } = require("../middlewares/authentication");
const {
  getHotelTypes,
  createHotelType,
  getHotelType,
  updateHotelType,
  deleteHotelType,
} = require("../controllers/HotelTypeController");

router
  .route("/")
  .post(
    authenticate,
    verifyAdmin,
    validate(validationSchema.hotelTypeValidator),
    createHotelType
  );

router
  .route("/:id")
  .patch(
    authenticate,
    verifyAdmin,
    validate(validationSchema.hotelTypeValidator),
    updateHotelType
  );

router.route("/:id").delete(authenticate, verifyAdmin, deleteHotelType);

router.route("/").get(authenticate, verifyAdmin, getHotelTypes);
router.route("/:id").get(authenticate, verifyAdmin, getHotelType);
module.exports = router;
