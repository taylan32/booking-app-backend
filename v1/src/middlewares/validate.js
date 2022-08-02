const httpStatus = require("http-status");

const validate = (schema) => (req, res, next) => {
  const { value, error } = schema.validate(req.body);
  if (error) {
    const errorMessage = error.details
      ?.map((detail) => detail.message)
      .join(", ");
    res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: errorMessage,
    });
    return;
  }

  Object.assign(req, value);
  return next();
};

module.exports = validate;
