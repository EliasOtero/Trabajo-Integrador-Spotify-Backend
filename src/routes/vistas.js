const express = require("express");
const router = express.Router();
const VistasController = require("../controllers/vistasController");
const VistasController2 = require("../controllers/vistascontroller2")


router.get("/canciones-populares-por-pais", VistasController.cancionesPopularesPorPais);

//router.get("/ingresos-por-artista-discografica", VistasController2.ingresosPorArtistaDiscografica);

module.exports = router;