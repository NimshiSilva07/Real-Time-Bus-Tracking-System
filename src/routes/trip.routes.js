const express = require("express");
const { getTrips, addTrip } = require("../controllers/trips.controller");
const auth = require("../middleware/auth.middleware");

const router = express.Router();
router.get("/", getTrips);
router.post("/", auth, addTrip);

module.exports = router;
