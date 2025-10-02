const Bus = require("../models/bus.model");

exports.getBuses = async (req, res) => {
  const buses = await Bus.find().populate("route");
  res.json(buses);
};

exports.updateBusLocation = async (req, res) => {
  const { id } = req.params;
  const { lat, lng } = req.body;
  try {
    const bus = await Bus.findByIdAndUpdate(id, { currentLocation: { lat, lng } }, { new: true });
    res.json(bus);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
