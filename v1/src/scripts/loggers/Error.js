const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  defaultMeta: { service: "error-service" },
  transports: [
    new winston.transports.File(
      {
        filename: "v1/src/logs/error/error.log",
        level: "error",
      },
      { timestamp: true }
    ),
  ],
});

module.exports = logger