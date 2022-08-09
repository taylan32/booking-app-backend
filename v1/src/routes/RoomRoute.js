const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate");
const { authenticate, verifyAdmin } = require("../middlewares/authentication");
const validationSchema = require("../validations/RoomValidator");
const {
  createRoom,
  getRooms,
  getRoom,
  updateRoom,
  getRoomsByHotel,
  getRoomsByIsAvailable,
  getRoomsByHotelAndIsAvailable,
} = require("../controllers/RoomController");

router
  .route("/")
  .post(
    authenticate,
    verifyAdmin,
    validate(validationSchema.createRoomValidator),
    createRoom
  );
router
  .route("/:id")
  .patch(
    authenticate,
    verifyAdmin,
    validate(validationSchema.updateRoomValidator),
    updateRoom
  );
router.route("/").get(authenticate, verifyAdmin, getRooms);
router.route("/:id").get(authenticate, verifyAdmin, getRoom);
router
  .route("/getroomsbyhotel/:id")
  .get(getRoomsByHotel);
router
  .route("/getRooms/ByAvailable")
  .get(authenticate, verifyAdmin, getRoomsByIsAvailable);
router
  .route("/getRooms/ByHotelAndAvailable")
  .get(authenticate, verifyAdmin, getRoomsByHotelAndIsAvailable);

module.exports = router;
