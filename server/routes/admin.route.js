const router  = require("express").Router();
const { protect, adminOnly }       = require("../middleware/auth.middleware");
const { getAnalytics, getAllUsers } = require("../controllers/admin.controller");
const { getAllOrders, updateOrderStatus } = require("../controllers/order.controller");
const { getProducts, createProduct, updateProduct, deleteProduct }
  = require("../controllers/product.controller");

// All admin routes are protected
router.use(protect, adminOnly);

// Analytics
router.get("/analytics", getAnalytics);

// Users
router.get("/users", getAllUsers);

// Orders
router.get("/orders",          getAllOrders);
router.put("/orders/:id",      updateOrderStatus);

// Products
router.get("/products",        getProducts);
router.post("/products",       createProduct);
router.put("/products/:id",    updateProduct);
router.delete("/products/:id", deleteProduct);

module.exports = router;