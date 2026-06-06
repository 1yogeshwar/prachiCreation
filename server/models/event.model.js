const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, required: true },
  location:    { type: String, required: true },
  date:        { type: Date,   required: true },
  image:       { type: String, default: "" },
  tag:         { type: String, enum: ["exhibition", "pop-up", "market", "festival"], default: "exhibition" },
  isPublished: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model("Event", eventSchema);