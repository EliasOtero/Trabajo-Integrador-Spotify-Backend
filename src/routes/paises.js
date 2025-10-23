const express = require("express");
const router = express.Router();
const paisesController = require("../controllers/paisesController");

router.get("/", paisesController.getAll);
router.get("/:id", paisesController.getById);
router.post("/", paisesController.create);

module.exports = router;