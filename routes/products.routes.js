const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

const productController = require("../controllers/products.controllers");

router.get("/", productController.getAll);
router.post("/add", productController.addProduct);
router.put("/:_id", productController.updateProduct);
router.delete("/:_id", productController.deleteProduct);

module.exports = router;
