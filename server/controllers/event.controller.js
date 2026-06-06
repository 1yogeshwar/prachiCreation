const Event = require("../models/event.model");

// GET /api/events — public
const getEvents = async (req, res) => {
  try {
    const events = await Event.find({ isPublished: true }).sort({ date: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/admin/events — admin only
const createEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/admin/events/:id — admin only
const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/admin/events/:id — admin only
const deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getEvents, createEvent, updateEvent, deleteEvent };