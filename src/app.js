const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const routeRoutes = require("./routes/route.routes");
const busRoutes = require("./routes/bus.routes");
const tripRoutes = require("./routes/trip.routes");
const errorHandler = require("./middleware/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/routes", routeRoutes);
app.use("/api/buses", busRoutes);
app.use("/api/trips", tripRoutes);

app.use(errorHandler);

module.exports = app;
