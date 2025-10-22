const express = require("express");
const router = express.Router();
const cancionesController = require("../controllers/cancionesController");

router.get("/", cancionesController.getAll);
router.get("/:id", cancionesController.getById);
router.post("/", cancionesController.create);
router.put("/:id", cancionesController.update);
router.post("/:id/generos", cancionesController.addGenero);
router.delete("/:id/generos/:idGenero", cancionesController.removeGenero);

module.exports = router;