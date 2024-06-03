const express = require("express");
const router = express.Router();

const { getAllEvents } = require("../controllers/Event");

router.get("/getAllEvents", getAllEvents);

module.exports = router;
