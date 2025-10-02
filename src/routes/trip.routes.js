const express = require("express");
const { getTrips, addTrip } = require("../controllers/trips.controller");
const auth = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

const router = express.Router();
router.get("/", getTrips); // Public - anyone can view trips
router.post("/", auth, roleMiddleware(["admin", "operator"]), addTrip); // Admin and operators can add trips

module.exports = router;
