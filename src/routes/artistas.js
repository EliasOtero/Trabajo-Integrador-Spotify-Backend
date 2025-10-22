const express = require("express");
const router = express.Router();
const artistasController = require("../controllers/artistasController");

router.get("/", artistasController.getAll);
router.get("/:id", artistasController.getById);
router.post("/", artistasController.create);

module.exports = router;