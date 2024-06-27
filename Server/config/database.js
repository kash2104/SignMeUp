const mongoose = require("mongoose");
const { logger } = require("../utils/logger");
require("dotenv").config();

exports.connect = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      logger.log("error", "DB connected successfully");
    })
    .catch((error) => {
      console.log("DB connection failed");
      logger.error("error is: ", error);
      process.exit(1);
    });
};
