const Route = require("../models/route.model");

exports.getRoutes = async (req, res) => {
  const routes = await Route.find();
  res.json(routes);
};

exports.addRoute = async (req, res) => {
  try {
    const route = await Route.create(req.body);
    res.status(201).json(route);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
