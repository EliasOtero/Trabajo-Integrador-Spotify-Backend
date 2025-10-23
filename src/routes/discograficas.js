const express = require("express");
const router = express.Router();
const discograficasController = require("../controllers/discograficasController");

router.get("/", discograficasController.getAll);
router.get("/:id", discograficasController.getById);
router.get("/pais/:idPais", discograficasController.getByPais);
router.post("/", discograficasController.create);

module.exports = router;