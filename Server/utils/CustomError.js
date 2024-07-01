const {
  log,
  warn,
  error,
  fatal,
  debug,
  event,
  info,
  database,
} = require("./logger")

class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    error(message, JSON.stringify(statusCode));
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = CustomError;