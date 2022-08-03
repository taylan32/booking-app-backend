const joi = require("joi");

const createRoomValidator = joi.object({
  title: joi.string().required().min(3),
  hotelId: joi.string().required().min(10),
  price: joi.number().required().min(1),
  maxPeople: joi.number().required().min(1),
  description: joi.string().required().min(10),
  roomNumber: joi.number().required(),
  isAvailable: joi.boolean().required(),
});

const updateRoomValidator = joi.object({
  title: joi.string().min(3),
  price: joi.number().min(1),
  maxPeople: joi.number().min(1),
  description: joi.string().min(10),
  isAvailable: joi.boolean(),
});

module.exports = {
  createRoomValidator,
  updateRoomValidator,
};
