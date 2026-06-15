const mongoose = require("mongoose");
const crypto   = require("crypto");

const customOrderSchema = new mongoose.Schema({
  // Customer info
  name:    { type: String, required: true },
  email:   { type: String, required: true },
  phone:   { type: String, required: true },

  // What they want
  productReference: { type: String },       // e.g. "Floral Keyring" or product name
  category:         { type: String },       // keyrings, frames, crochet etc
  description:      { type: String, required: true }, // full custom description

  // Customization parameters
  parameters: {
    size:       { type: String },           // small, medium, large / cm
    color:      { type: String },
    name:       { type: String },           // engraving / personalization
    quantity:   { type: Number, default: 1 },
    extraNotes: { type: String },
  },

  // Reference image URL (optional)
  referenceImage: { type: String },

  // Admin side
  status: {
    type: String,
    enum: ["pending", "reviewing", "quoted", "confirmed", "in_progress", "completed", "cancelled"],
    default: "pending",
  },
  quotedPrice:  { type: Number },           // Admin fills this after review
  adminNote:    { type: String },           // Admin's reply to customer

  trackingToken: {
    type:    String,
    unique:  true,
    default: () => crypto.randomBytes(12).toString("hex"),
  },
}, { timestamps: true });

module.exports = mongoose.model("CustomOrder", customOrderSchema);