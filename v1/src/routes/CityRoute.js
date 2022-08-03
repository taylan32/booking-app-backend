const express = require("express");
const {
  createCity,
  getCities,
  getCity,
  updateCity,
  deleteCity,
} = require("../controllers/CityController");
const validate = require("../middlewares/validate");
const validationSchema = require("../validations/CityValidator");
const { authenticate, verifyAdmin } = require("../middlewares/authentication");
const router = express.Router();

router
  .route("/")
  .post(
    authenticate,
    verifyAdmin,
    validate(validationSchema.cityValidator),
    createCity
  );
router.route("/:id").delete(authenticate, verifyAdmin, deleteCity);
router
  .route("/:id")
  .patch(
    authenticate,
    verifyAdmin,
    validate(validationSchema.cityValidator),
    updateCity
  );
router.route("/").get(authenticate, verifyAdmin, getCities);
router.route("/:id").get(authenticate, verifyAdmin, getCity);

module.exports = router;
