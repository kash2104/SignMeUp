const express = require("express");
const app = express();
const cors = require("cors");

const eventRoutes = require("./routes/Event");
const loginRoutes = require("./routes/Auth");

const database = require("./config/database");

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const User = require("./models/User");
const session = require("express-session");
const passportLocalMongoose = require("passport-local-mongoose");

const cookieParser = require("cookie-parser");

const { morganMiddleware } = require("./middleware/morganMiddleware");
const { logger } = require("./utils/logger");

require("dotenv").config();

const PORT = process.env.PORT || 4000;

//database connection
database.connect();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
// app.use(morganMiddleware);

//mounting the routes
//1. event controller
app.use("/api/v1/events", eventRoutes);

//2. login controller
app.use("/api/v1/auth", loginRoutes);

//GOOGLE AUTH
app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./controllers/AuthGoogle");


app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/private",
  passport.authenticate("google", { scope: ["profile", "email"], failureRedirect: "/" }),
  function (req, res) {
    logger.error("Logged In Successfully");
    // //cookie
    // const cookiePayload = req.user;
    // res.cookie("token", cookiePayload);
    res.redirect(
      `http://localhost:3000/signup/created/all?user_key=${req.user._id}`
    );
  }
);

//default route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your app is running successfully",
  });
});

//activating the server
app.listen(PORT, () => {
  logger.info(`App is running successfully at port ${PORT}`);
});
