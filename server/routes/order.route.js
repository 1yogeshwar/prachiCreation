const router  = require("express").Router();
const Order   = require("../models/order.model");
const { protect } = require("../middleware/auth.middleware");
const { createOrder, getMyOrders, getOrderById } = require("../controllers/order.controller");

router.post("/",          createOrder);

// ✅ MUST be before /:id
router.get("/track/:token", async (req, res) => {
  try {
    const order = await Order.findOne({ trackingToken: req.params.token });
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json({
      orderId:       order._id,
      orderStatus:   order.orderStatus,
      paymentStatus: order.paymentStatus,
      paymentMethod: order.paymentMethod,
      items:         order.items,
      total:         order.total,
      createdAt:     order.createdAt,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/",    protect, getMyOrders);
router.get("/:id", protect, getOrderById);

module.exports = router;