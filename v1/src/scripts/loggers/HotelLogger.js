const winston = require("winston");
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "hotel-service" },
  transports: [
    new winston.transports.File({
      filename: "v1/logs/hotel/error.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: "v1/logs/hotel/info.log",
      level: "info",
    }),
    new winston.transports.File({
      filename: "v1/logs/hotel/combined.log",
    }),
  ],
});

module.exports = logger;
