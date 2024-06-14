const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  googleId: {
    type: String,
  },
  googleDisplayName: {
    type: String,
  },
  subHead : [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
  }],
  cityManager : [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
  }],
  participant : [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
  }],
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
