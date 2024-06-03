const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
  totalslotfilled: {
    type: Number,
  },
  totalslot: {
    type: Number,
  },
  percentagefilled: {
    type: Number,
  },
  totalavailableslot: {
    type: Number,
  },
  percentageavailabe: {
    type: Number,
  },
});

module.exports = mongoose.model("Slotmetrics", slotSchema);
