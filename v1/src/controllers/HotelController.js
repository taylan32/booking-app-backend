const CustomError = require("../errors/CustomError");
const httpStatus = require("http-status");
const {
  insert,
  list,
  modify,
  remove,
  countHotelByCity,
  countHotelByType,
  findOne,
  countByField,
} = require("../services/HotelService");
const CityService = require("../services/CityService");
const HotelTypeService = require("../services/HotelTypeService");

const createHotel = async (req, res, next) => {
  try {
    await insert(req.body);
    return res.status(httpStatus.CREATED).json({
      success: true,
      message: "Hotel added",
    });
  } catch (error) {
    return next(CustomError(error.message, httpStatus.INTERNAL_SERVER_ERROR));
  }
};

const getHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    // gt: greater than gte:greater then or equal
    const hotels = await list({
      ...others,
      cheapestPrice: { $gte: min || 1, $lte: max || 999 },
    }).limit(req.query.limit);
    return res.status(httpStatus.OK).json({
      success: true,
      message: "Hotels listed",
      data: hotels,
    });
  } catch (error) {
    return next(CustomError(error.message, httpStatus.INTERNAL_SERVER_ERROR));
  }
};

const getHotel = async (req, res, next) => {
  try {
    const hotel = await findOne(req.params.id);
    if (!hotel) {
      return next(CustomError("Hotel not found", httpStatus.NOT_FOUND));
    }
    return res.status(httpStatus.OK).json({
      success: true,
      message: "Hotel listed",
      data: hotel,
    });
  } catch (error) {
    return next(CustomError(error.message, httpStatus.INTERNAL_SERVER_ERROR));
  }
};

const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await modify({ _id: req.params.id }, req.body);
    if (!updatedHotel) {
      return next(CustomError("Hotel not found", httpStatus.NOT_FOUND));
    }
    return res.status(httpStatus.OK).json({
      success: true,
      message: "Hotel updated",
      data: updatedHotel,
    });
  } catch (error) {
    return next(CustomError(error.message, httpStatus.INTERNAL_SERVER_ERROR));
  }
};

const deleteHotel = async (req, res, next) => {
  try {
    const deletedHotel = await remove(req.params.id);
    if (!deletedHotel) {
      return next(CustomError("Hotel not found", httpStatus.NOT_FOUND));
    }
    return res.status(httpStatus.OK).json({
      success: true,
      message: "Hotel has been deleted",
    });
  } catch (error) {
    return next(CustomError(error.message, httpStatus.INTERNAL_SERVER_ERROR));
  }
};

const countByCity = async (req, res, next) => {
  try {
    const cities = req.query.cities.split(",");
    let response = [];
    await Promise.all(
      cities.map(async (city) => {
        let count = await countByField({ city: city });
        let cityName = await CityService.findOne(city);
        response.push({ city: cityName?.name, count: count });
      })
    );
    return res.status(httpStatus.OK).json({
      success: true,
      message: "Count listed",
      data: response,
    });
  } catch (error) {
    return next(CustomError(error.message, httpStatus.INTERNAL_SERVER_ERROR));
  }
};

const countByType = async (req, res, next) => {
  try {
    const hotelTypes = await HotelTypeService.list();
    let response = [];
    await Promise.all(
      hotelTypes.map(async (hotelType) => {
        let count = await countByField({ type: hotelType._id.toString() });
        let hotelTypeName = await HotelTypeService.findOne(hotelType);
        response.push({ hotelType: hotelTypeName.name, count: count });
      })
    );
    return res.status(httpStatus.OK).json({
      success: true,
      message: "Listed",
      data: response,
    });
    // const resortCount = await countHotelByType("Resort");
    // const hotelCount = await countHotelByType("Hotel");
    // const apartmentCount = await countHotelByType("Apartment");
    // const villaCount = await countHotelByType("Villa");
    // const cabinCount = await countHotelByType("Cabin");
    // console.log(resortCount)
    // return res.status(httpStatus.OK).json({
    //   success: true,
    //   message: "Counts listed",
    //   data: [
    //     { type: "Resorts", count: resortCount },
    //     { type: "Hotel", count: hotelCount },
    //     { type: "Apartment", count: apartmentCount },
    //     { type: "Villa", count: villaCount },
    //     { type: "Cabin", count: cabinCount },
    //   ],
    // });
  } catch (error) {
    return next(CustomError(error.message, httpStatus.INTERNAL_SERVER_ERROR));
  }
};

const getHotelRooms = async (req, res, next) => {};

module.exports = {
  createHotel,
  getHotels,
  getHotel,
  updateHotel,
  deleteHotel,
  countByCity,
  countByType,
  getHotelRooms,
};
