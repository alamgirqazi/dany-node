const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

const userProductController = require("../controllers/user-products.controllers");

router.get("/", userProductController.getAll);
router.get("/:user_id", userProductController.getSingleProduct);
router.get("/gold/:user_id", userProductController.getGoldProduct);
router.post("/gold/:user_id", userProductController.addGoldProduct);
router.delete("/gold/:user_id/:delete_index", userProductController.deleteGoldProduct);
router.post("/add", userProductController.addProduct);
router.put("/:_id", userProductController.updateProduct);
router.delete("/:_id", userProductController.deleteProduct);

module.exports = router;
