const express = require("express");
const { getBuses, updateBusLocation } = require("../controllers/buses.controller");
const auth = require("../middleware/auth.middleware");

const router = express.Router();
router.get("/", getBuses);
router.put("/:id/location", auth, updateBusLocation);

module.exports = router;
