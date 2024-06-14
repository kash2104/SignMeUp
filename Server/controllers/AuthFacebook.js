const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../models/User");

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/secrets",
    profileFields: ['id', 'displayName', 'email'] // Adjust the profile fields as needed
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOne({ facebookId: profile.id })
      .exec()
      .then((user) => {
        if (!user) {
          const newUser = new User({
            facebookId: profile.id,
            facebookDisplayName: profile.displayName,
            email : profile.email,
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
  ));


  module.exports = passport;