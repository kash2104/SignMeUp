const winston = require("winston");

const { combine, timestamp, colorize, align, printf, json } = winston.format;

const loglevel = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5,
};

const errorFilter = winston.format((info, opts) => {
  return info.level === "error" ? info : false;
});

const infoFilter = winston.format((info, opts) => {
  return info.level === "info" ? info : false;
});

exports.logger = winston.createLogger({
  level: loglevel,
  format: combine(
    colorize({ all: true }),
    timestamp({
      format: "DD-MM-YYY hh:mm::ss A",
    }),
    align(),
    printf((info) => `${info.level} ${info.message} [${info.timestamp}]`)
  ),
  transports: [
    new winston.transports.File({
      filename: "combined.log",
    }),

    new winston.transports.File({
      filename: "app-error.log",
      level: "error",
      //   format: combine(errorFilter(), timestamp(), json()),
    }),
    new winston.transports.File({
      filename: "app-info.log",
      level: "info",
      //   format: combine(infoFilter(), timestamp(), json()),
    }),
  ],
});
