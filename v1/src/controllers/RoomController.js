const httpStatus = require("http-status");
const CustomError = require("../errors/CustomError");
const {
  insert,
  list,
  findOne,
  modify,
  findByRoomNumber,
  remove,
} = require("../services/RoomService");

const createRoom = async (req, res, next) => {
  try {
    let room = await findByRoomNumber(req.body.roomNumber);
    if (room != null) {
      return next(CustomError("Room already exists", httpStatus.BAD_REQUEST));
    }
    room = await insert(req.body);
    return res.status(httpStatus.CREATED).json({
      success: true,
      message: "Room added",
      data: room,
    });
  } catch (error) {
    return next(CustomError(error.message, httpStatus.INTERNAL_SERVER_ERROR));
  }
};

const getRooms = async (req, res, next) => {
  try {
    const rooms = await list();
    return res.status(httpStatus.OK).json({
      success: true,
      message: "Rooms listed",
      data: rooms,
    });
  } catch (error) {
    return next(CustomError(error.message, httpStatus.INTERNAL_SERVER_ERROR));
  }
};

const getRoom = async (req, res, next) => {
  try {
    const room = await findOne(req.params.id);
    if (!room) {
      return next(CustomError("Room not found", httpStatus.NOT_FOUND));
    }
    return res.status(httpStatus.OK).json({
      success: true,
      message: "Room listed",
      data: room,
    });
  } catch (error) {
    return next(CustomError(error.message, httpStatus.INTERNAL_SERVER_ERROR));
  }
};

const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await modify(req.params.id, req.body);
    if (!updatedRoom) {
      return next(CustomError("Room not found", httpStatus.NOT_FOUND));
    }
    return res.status(httpStatus.OK).json({
      success: true,
      message: "Room updated",
      data: updatedRoom,
    });
  } catch (error) {
    return next(CustomError(error.message, httpStatus.INTERNAL_SERVER_ERROR));
  }
};

const deleteRoom = async (req, res, next) => {
  try {
    const deletedRoom = await remove(req.params.id);
    if (!deletedRoom) {
      return next(CustomError("Room not found", httpStatus.NOT_FOUND));
    }
    return res.status(httpStatus.OK).json({
      success: true,
      message: "Room deleted",
    });
  } catch (error) {
    return next(CustomError(error.message, httpStatus.INTERNAL_SERVER_ERROR));
  }
};

const getRoomsByHotel = async (req, res, next) => {
  try {
    const rooms = await list({ hotelId: req.params.id });
    return res.status(httpStatus.OK).json({
      success: true,
      message: "Rooms listed",
      data: rooms,
    });
  } catch (error) {
    return next(CustomError(error.message, httpStatus.INTERNAL_SERVER_ERROR));
  }
};
const getRoomsByIsAvailable = async (req, res, next) => {
  try {
    const rooms = await list({ isAvailable: req.query.available });
    return res.status(httpStatus.OK).json({
      success: true,
      message: "Rooms listed",
      data: rooms,
    });
  } catch (error) {
    return next(CustomError(error.message, httpStatus.INTERNAL_SERVER_ERROR));
  }
};

const getRoomsByHotelAndIsAvailable = async(req, res, next) => {
    try {
        const rooms = await list({hotelId:req.query.hotel ,isAvailable: req.query.available });
        return res.status(httpStatus.OK).json({
          success: true,
          message: "Rooms listed",
          data: rooms,
        });
      } catch (error) {
        return next(CustomError(error.message, httpStatus.INTERNAL_SERVER_ERROR));
      }
}

module.exports = {
  createRoom,
  getRooms,
  getRoom,
  updateRoom,
  deleteRoom,
  getRoomsByHotel,
  getRoomsByIsAvailable,
  getRoomsByHotelAndIsAvailable
};
