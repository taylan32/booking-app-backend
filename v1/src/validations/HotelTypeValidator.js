const joi = require("joi");

const hotelTypeValidator = joi.object({
  name: joi.string().required().min(3),
});

module.exports = {
  hotelTypeValidator,
};
