const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("../../config/db");
const Route = require("../models/route.model");
const Bus = require("../models/bus.model");
const Trip = require("../models/trip.model");
const seedData = require("../../data/seed.json");

dotenv.config();

connectDB().then(async () => {
  try {
    await Route.deleteMany();
    await Bus.deleteMany();
    await Trip.deleteMany();

    const routes = await Route.insertMany(seedData.routes);
    const buses = seedData.buses.map(b => {
      const route = routes.find(r => r.routeNumber === b.route);
      return { ...b, route: route._id };
    });
    const insertedBuses = await Bus.insertMany(buses);

    const trips = seedData.trips.map(t => {
      const bus = insertedBuses.find(b => b.busNumber === t.busNumber);
      const route = routes.find(r => r.routeNumber === t.routeNumber);
      return {
        bus: bus._id,
        route: route._id,
        departureTime: t.departureTime,
        arrivalTime: t.arrivalTime
      };
    });
    await Trip.insertMany(trips);

    console.log("✅ Data seeded successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});
