const joi = require("joi");

const createValidation = joi.object({
  firstName: joi.string().required().min(3),
  lastName: joi.string().required().min(3),
  email: joi.string().required().email().min(8),
  password: joi.string().required().min(4),
  country: joi.string().required().min(3),
  city: joi.string().required().min(3),
  phone: joi.string().required().min(5),
});

const updateValidator = joi.object({
  firstName: joi.string().min(3),
  lastName: joi.string().min(3),
  country: joi.string().min(3),
  city: joi.string().min(3),
  phone: joi.string().min(5),
});

const loginValidator = joi.object({
  email: joi.string().required().email().min(8),
  password: joi.string().required().min(4),
});

const changePasswordValidator = joi.object({
  password: joi.string().required().min(4),
});

module.exports = {
  createValidation,
  loginValidator,
  changePasswordValidator,
  updateValidator
};
