const express = require("express");
const router = express.Router();
const pagosController = require("../controllers/pagosController");

router.get("/", pagosController.getAll);
router.get("/:id", pagosController.getById);
router.post("/", pagosController.create);

module.exports = router;