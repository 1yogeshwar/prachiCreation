const Product = require("../models/product.model");
const User    = require("../models/user.model");
const Order   = require("../models/order.model");

// GET /api/admin/analytics
const getAnalytics = async (req, res) => {
  try {
    const [totalProducts, totalUsers, totalOrders, revenueData] = await Promise.all([
      Product.countDocuments(),
      User.countDocuments({ role: "user" }),
      Order.countDocuments(),
      Order.aggregate([
        { $match: { paymentStatus: "paid" } },
        { $group: { _id: null, total: { $sum: "$total" } } }
      ]),
    ]);
    res.json({
      totalProducts,
      totalUsers,
      totalOrders,
      totalRevenue: revenueData[0]?.total || 0,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/admin/users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAnalytics, getAllUsers };