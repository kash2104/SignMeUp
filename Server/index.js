const express = require("express");
const app = express();
const cors = require("cors");

const eventRoutes = require("./routes/Event");

const database = require("./config/database");

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const User = require("./models/User");
const session = require("express-session");
const passportLocalMongoose = require("passport-local-mongoose");

const cookieParser = require("cookie-parser");

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

//mounting the routes
//1. event controller
app.use("/api/v1/events", eventRoutes);

//GOOGLE AUTH
app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

passport.use(User.createStrategy());
passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(function (id, done) {
  User.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err);
    });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:4000/auth/google/private",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOne({ googleId: profile.id })
        .exec()
        .then((user) => {
          if (!user) {
            const newUser = new User({
              googleId: profile.id,
              googleDisplayName: profile.displayName,
            });
            return newUser.save();
          } else {
            return user;
          }
        })
        .then((user) => {
          return cb(null, user);
        })
        .catch((err) => {
          return cb(err);
        });
    }
  )
);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

app.get(
  "/auth/google/private",
  passport.authenticate("google", { failureRedirect: "/" }),
  function (req, res) {
    console.log("Logged In Successfully");
    res.redirect(
      `http://localhost:3000/signup/created/all?user_key=${req.sessionID}`
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
  console.log(`App is running successfully at port ${PORT}`);
});
