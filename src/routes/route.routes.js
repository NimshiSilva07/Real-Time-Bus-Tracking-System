const express = require("express");
const { getRoutes, addRoute } = require("../controllers/routes.controller");
const auth = require("../middleware/auth.middleware");

const router = express.Router();
router.get("/", getRoutes);
router.post("/", auth, addRoute);

module.exports = router;
