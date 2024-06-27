const mongoose = require("mongoose");
const { logger, log, database } = require("../utils/logger");
require("dotenv").config();

exports.connect = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      // log({ level: "database", message: "DB connected successfully" });
      database("DB connected successfully");
    })
    .catch((error) => {
      console.log("DB connection failed");
      console.error("error is: ", error);
      process.exit(1);
    });
};
