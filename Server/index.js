const express = require("express");
const app = express();
const cors = require("cors");

const eventRoutes = require("./routes/Event");
const loginRoutes = require("./routes/Auth");

const dataBase = require("./config/database");

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const User = require("./models/User");
const session = require("express-session");
const passportLocalMongoose = require("passport-local-mongoose");

const cookieParser = require("cookie-parser");

const { morganMiddleware } = require("./middleware/morganMiddleware");
const {
  log,
  warn,
  error,
  fatal,
  debug,
  event,
  info,
  database,
} = require("./utils/logger");

require("dotenv").config();

const PORT = process.env.PORT || 4000;

//database connection
dataBase.connect();

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
  passport.authenticate("google", { scope: ["profile"] })
);

app.get(
  "/auth/google/private",
  passport.authenticate("google", { failureRedirect: "/" }),
  function (req, res) {
    console.log("Logged In Successfully");
    // //cookie
    // const cookiePayload = req.user;
    // res.cookie("token", cookiePayload);
    res.redirect(
      `http://localhost:3000/signup/created/all?user_key=${req.user._id}`
    );
  }
);

app.get("/user", (req, res) => {
  try{
    if(!req.user){
      console.log("Error Thrown");
      throw new CustomError("User not found", 404);
    }
    return res.status(200).json({
      success: true,
      data: req.user
    });
  }catch(err){
    return res.status(404).json({
      success: false,
      message: err.message
    });
  }

});

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

//error handling middleware
app.use(errorController);


//default route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your app is running successfully",
  });
});

app.all("*", (req,res)=>{
  const error = new CustomError(`Can't find ${req.originalUrl} on this server`, 404);
  error.status = "fail";
  error.statusCode = 404;
  next(error);
});

//activating the server
app.listen(PORT, () => {
  console.log(`App is running successfully at port ${PORT}`);
});
