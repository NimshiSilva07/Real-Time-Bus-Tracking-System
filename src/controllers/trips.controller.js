const Trip = require("../models/trip.model");

exports.getTrips = async (req, res) => {
  const trips = await Trip.find().populate("bus route");
  res.json(trips);
};

exports.addTrip = async (req, res) => {
  try {
    const trip = await Trip.create(req.body);
    res.status(201).json(trip);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
