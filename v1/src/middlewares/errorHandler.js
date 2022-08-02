const logger = require("../scripts/loggers/Error");
module.exports = (err, req, res, next) => {
  if (err.code === 11000) {
    const fields = Object.keys(err.keyPattern).join(",");
    err.message = `${fields} already in use`;
  }

  logger.log({
    level: "error",
    messsage: {
      error,
      request: req,
    },
  });

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "An unhandled error occured.",
  });
};
