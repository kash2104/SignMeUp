const mongoose = require("mongoose");

// Organization Schema
const organizationSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    website: {
      type: String,
    },
    description: {
      type: String,
    },
    events: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event'
    }]
  });

  module.exports = mongoose.model("Organization", organizationSchema);
