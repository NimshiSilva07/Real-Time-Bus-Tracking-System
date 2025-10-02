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

    // Insert Routes
    const routes = await Route.insertMany(seedData.routes);

    // Insert Buses
    const buses = seedData.buses.map(b => {
      const route = routes.find(r => r.routeNumber === b.route);
      return { ...b, route: route._id };
    });
    const insertedBuses = await Bus.insertMany(buses);

    // Generate trips for 7 days
    const trips = [];
    const today = new Date();
    insertedBuses.forEach(bus => {
      for (let i = 0; i < 7; i++) {
        const dep = new Date(today);
        dep.setDate(dep.getDate() + i);
        dep.setHours(6 + Math.floor(Math.random() * 12), 0, 0); 
        const arr = new Date(dep);
        arr.setHours(arr.getHours() + Math.floor(Math.random() * 5) + 2); 
        trips.push({
          bus: bus._id,
          route: bus.route,
          departureTime: dep,
          arrivalTime: arr
        });
      }
    });

    await Trip.insertMany(trips);

    console.log(`Seeded: ${routes.length} routes, ${insertedBuses.length} buses, ${trips.length} trips`);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});
