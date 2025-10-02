const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  bus: { type: mongoose.Schema.Types.ObjectId, ref: "Bus" },
  route: { type: mongoose.Schema.Types.ObjectId, ref: "Route" },
  departureTime: Date,
  arrivalTime: Date
});

module.exports = mongoose.model("Trip", tripSchema);
