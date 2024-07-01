const mongoose = require("mongoose");
const { logger, database } = require("../utils/logger");
require("dotenv").config();

exports.connect = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      database("DB connected successfully");
    })
    .catch((error) => {
      console.log("DB connection failed");
      consle.error("error is: ", error);
      process.exit(1);
    });
};
