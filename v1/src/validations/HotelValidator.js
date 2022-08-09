const joi = require("joi");

const createHotelValidator = joi.object({
  name: joi.string().required().min(2),
  type: joi.string().required().min(10),
  city: joi.string().required().min(10),
  address: joi.string().required().min(10),
  distance: joi.string().required().min(10),
  title: joi.string().required().min(2),
  description: joi.string().required().min(5),
  featured:joi.boolean(),
  cheapestPrice:joi.number().required().min(1)
});

const updateHotelValidator = joi.object({
  name: joi.string().min(2),
  type: joi.string().min(10),
  city: joi.string().min(10),
  address: joi.string().min(10),
  distance: joi.string().min(10),
  title: joi.string().min(2),
  description: joi.string().min(5),
  featured:joi.boolean()
});

module.exports = {
  createHotelValidator,
  updateHotelValidator,
};
