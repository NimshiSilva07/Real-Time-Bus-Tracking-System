const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema({
  routeNumber: { type: String, required: true },
  start: { type: String, required: true },
  end: { type: String, required: true },
  distanceKm: Number
});

module.exports = mongoose.model("Route", routeSchema);
