const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  starttime: {
    type: Number,
  },
  startdatestring: {
    type: String,
  },
  startdate: {
    type: Date,
  },
  signupurl: {
    type: String,
  },
  mainimage: {
    type: String,
  },
  signupid: {
    type: Number,
  },
  groupid: {
    type: Number,
  },
  group: {
    type: String,
  },
  entime: {
    type: Number,
  },
  enddateString: {
    type: String,
  },
  enddate: {
    type: Date,
  },
  contactName: {
    type: String,
  },
  contactEmail: {
    type: String,
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref : 'Organization',
  },
  workers : [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Roles',
    required: true, 
  }],
  // subHeads: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: true,
  // }],
  // cityManagers: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: true,
  // }],
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }],
  location: {
    type: String,
  },
  city : {
    type: String,
  },
  state : {
    type: String,
  },
  slotmetrics: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Slotmetrics",
  },
});

module.exports = mongoose.model("Event", eventSchema);
