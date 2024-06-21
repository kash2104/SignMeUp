const mongoose = require("mongoose");

// Role Schema
const roleSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    role: {
      type: String,
      enum: ['SubHead', 'CityManager'],
      required: true,
    },
    state: {
      type: String,
      required: function() {
        return this.role === 'SubHead';
      },
    },
    city: {
      type: String,
      required: function() {
        return this.role === 'CityManager';
      },
    }
  });


  module.exports = mongoose.model("Roles", roleSchema);