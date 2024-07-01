const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Serialize user
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// Deserialize user
passport.deserializeUser(function (id, done) {
  User.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err);
    });
});

// Use local strategy
passport.use(User.createStrategy());

// Use Google strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:4000/auth/google/private",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
      scope: ['profile', 'email'],
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOne({ googleId: profile.id })
        .exec()
        .then((user) => {
          if (!user) {
            const newUser = new User({
              googleId: profile.id,
              name: profile.displayName,
              email: profile.emails[0].value, // Get the email from profile.emails
            });

            return newUser.save();
          } else {

            return user;
          }
        })
        // .then((user) => {
        //   return cb(null, user);
        // })
        .then((user) => {
          // Generate JWT token
          const token = jwt.sign({ googleId: profile.id }, process.env.JWT_SECRET);
          user.token = token; // Store token in user object to access in callback
          console.log("New Token",token);
          return cb(null, user);
        })
        .catch((err) => {
          return cb(err);
        });
    }
  )
);

module.exports = passport;
