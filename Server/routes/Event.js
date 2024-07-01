const express = require("express");
const router = express.Router();

const { getAllEvents } = require("../controllers/Event");
const { auth } = require("../middleware/auth");

router.get("/getAllEvents", getAllEvents);

module.exports = router;
