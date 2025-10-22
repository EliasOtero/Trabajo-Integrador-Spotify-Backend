const express = require("express");
const router = express.Router();
const suscripcionesController = require("../controllers/suscripcionesController");

router.get("/", suscripcionesController.getAll);
router.get("/:id", suscripcionesController.getById);
router.post("/", suscripcionesController.create);
router.put("/:id", suscripcionesController.update);

module.exports = router;