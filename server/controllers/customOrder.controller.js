const CustomOrder = require("../models/customOrder.model");

// POST /api/custom-orders — public (guest or logged in)
const createCustomOrder = async (req, res) => {
  try {
    const { name, email, phone, productReference, category,
            description, parameters, referenceImage } = req.body;

    if (!name || !email || !phone || !description)
      return res.status(400).json({ message: "Name, email, phone and description are required" });

    const order = await CustomOrder.create({
      name, email, phone,
      productReference, category,
      description, parameters,
      referenceImage,
    });

    res.status(201).json({
      message:       "Custom order request received!",
      trackingToken: order.trackingToken,
      orderId:       order._id,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/admin/custom-orders — admin only
const getAllCustomOrders = async (req, res) => {
  try {
    const orders = await CustomOrder.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/admin/custom-orders/:id — admin updates status + price
const updateCustomOrder = async (req, res) => {
  try {
    const { status, quotedPrice, adminNote } = req.body;
    const order = await CustomOrder.findByIdAndUpdate(
      req.params.id,
      { status, quotedPrice, adminNote },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createCustomOrder, getAllCustomOrders, updateCustomOrder };