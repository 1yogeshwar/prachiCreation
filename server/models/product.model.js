const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name:          { type: String, required: true, trim: true },
  slug:          { type: String, required: true, unique: true, lowercase: true },
  description:   { type: String, required: true },
  price:         { type: Number, required: true },
  originalPrice: { type: Number },
  discount:      { type: Number, default: 0 },
  images:        [{ type: String }],
  category:      { type: String, required: true },
  subcategory:   { type: String },
  colors:        [{ name: String, hex: String }],
  sizes:         [{ type: String }],
  stock:         { type: Number, default: 0 },
  rating:        { type: Number, default: 0 },
  reviewCount:   { type: Number, default: 0 },
  isFeatured:    { type: Boolean, default: false },
  isBestseller:  { type: Boolean, default: false },
  isNew:         { type: Boolean, default: false },
  isOnSale:      { type: Boolean, default: false },
  tags:          [{ type: String }],
  createdBy:     { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

productSchema.pre("validate", function (next) {
  if (this.name && !this.slug) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  }
  next();
});

module.exports = mongoose.model("Product", productSchema);