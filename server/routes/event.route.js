const router = require("express").Router();
const { getEvents, createEvent, updateEvent, deleteEvent } = require("../controllers/event.controller");
const { protect, adminOnly } = require("../middleware/auth.middleware");

// Public
router.get("/", getEvents);

// Admin only
router.post("/",      protect, adminOnly, createEvent);
router.put("/:id",    protect, adminOnly, updateEvent);
router.delete("/:id", protect, adminOnly, deleteEvent);

module.exports = router;