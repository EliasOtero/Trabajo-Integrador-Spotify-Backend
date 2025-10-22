const express = require("express");
const router = express.Router();
const albumesController = require("../controllers/albumesController");

router.get("/", albumesController.getAll);
router.get("/:id", albumesController.getById);
router.get("/:id/canciones", albumesController.getCanciones);
router.post("/", albumesController.create);

module.exports = router;