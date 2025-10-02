const express = require("express");
const { getRoutes, addRoute } = require("../controllers/routes.controller");
const auth = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

const router = express.Router();
router.get("/", getRoutes); // Public - anyone can view routes
router.post("/", auth, roleMiddleware(["admin"]), addRoute); // Only admin can add new routes

module.exports = router;
