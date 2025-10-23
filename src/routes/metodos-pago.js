const express = require("express");
const router = express.Router();
const metodosPagoController = require("../controllers/metodosPagoController");

router.get("/", metodosPagoController.getAll);
router.post("/", metodosPagoController.create);

module.exports = router;