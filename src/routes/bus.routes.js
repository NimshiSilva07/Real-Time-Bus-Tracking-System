const express = require("express");
const { getBuses, updateBusLocation } = require("../controllers/buses.controller");
const auth = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

const router = express.Router();
router.get("/", getBuses); // Public - anyone can view buses
router.put("/:id/location", auth, roleMiddleware(["admin", "operator"]), updateBusLocation); // Only admin and operators can update bus locations

module.exports = router;
