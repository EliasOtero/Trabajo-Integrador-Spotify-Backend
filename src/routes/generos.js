const express = require("express");
const router = express.Router();
const generosController = require("../controllers/generosController");

router.get("/", generosController.getAll);
router.post("/", generosController.create);

module.exports = router;