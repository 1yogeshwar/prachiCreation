const router = require("express").Router();
const { createCustomOrder, getAllCustomOrders, updateCustomOrder }
  = require("../controllers/customOrder.controller");
const { protect, adminOnly } = require("../middleware/auth.middleware");

// Public
router.post("/", createCustomOrder);

// Admin only
router.get("/",      protect, adminOnly, getAllCustomOrders);
router.put("/:id",   protect, adminOnly, updateCustomOrder);

module.exports = router;