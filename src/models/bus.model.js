const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  busNumber: { type: String, required: true },
  route: { type: mongoose.Schema.Types.ObjectId, ref: "Route" },
  currentLocation: {
    lat: Number,
    lng: Number,
  },
  status: { type: String, enum: ["running", "stopped"], default: "running" }
});

module.exports = mongoose.model("Bus", busSchema);
