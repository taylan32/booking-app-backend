const httpStatus = require("http-status");
const CustomError = require("../errors/CustomError");
const {
  insert,
  list,
  findOne,
  modify,
  remove,
  findByName,
} = require("../services/CityService");

const createCity = async (req, res, next) => {
  try {
    let city = await findByName(req.body);
    if (city != null) {
      return next(
        CustomError("City has already been added", httpStatus.BAD_REQUEST)
      );
    }
    city = await insert(req.body);
    return res.status(httpStatus.CREATED).json({
      success: true,
      message: "City added",
      data: city,
    });
  } catch (error) {
    return next(CustomError(error.message, httpStatus.INTERNAL_SERVER_ERROR));
  }
};

const getCities = async (req, res, next) => {
  try {
    const cities = await list();
    return res.status(httpStatus.OK).json({
      success: true,
      message: "Cities listed",
      data: cities,
    });
  } catch (error) {
    return next(CustomError(error.message, httpStatus.INTERNAL_SERVER_ERROR));
  }
};

const getCity = async (req, res, next) => {
  try {
    const city = await findOne(req.params.id);
    if (!city) {
      return next(CustomError("City not found", httpStatus.NOT_FOUND));
    }
    return res.status(httpStatus.OK).json({
      success: true,
      message: "City listed",
      data: city,
    });
  } catch (error) {
    return next(CustomError(error.message, httpStatus.INTERNAL_SERVER_ERROR));
  }
};

const updateCity = async (req, res, next) => {
  try {
    const updatedCity = await modify(req.params.id, req.body);
    if (!updatedCity) {
      return next(CustomError("City not found", httpStatus.NOT_FOUND));
    }
    return res.status(httpStatus.OK).json({
      success: true,
      message: "City updated",
      data: updatedCity,
    });
  } catch (error) {
    return next(CustomError(error.message, httpStatus.INTERNAL_SERVER_ERROR));
  }
};

const deleteCity = async (req, res, next) => {
  try {
    const deletedCity = await remove(req.params.id, req.body);
    if (!deletedCity) {
      return next(CustomError("City not found", httpStatus.NOT_FOUND));
    }
    return res.status(httpStatus.OK).json({
      success: true,
      message: "City deleted",
    });
  } catch (error) {
    return next(CustomError(error.message, httpStatus.INTERNAL_SERVER_ERROR));
  }
};

module.exports = {
  createCity,
  getCities,
  getCity,
  updateCity,
  deleteCity,
};
