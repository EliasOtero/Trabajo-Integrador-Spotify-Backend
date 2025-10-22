const express = require("express");
const router = express.Router();
const playlistsController = require("../controllers/playlistsController");

router.get("/", playlistsController.getAll);
router.get("/:id", playlistsController.getById);
router.post("/", playlistsController.create);
router.put("/:id", playlistsController.update);
router.post("/:id/canciones", playlistsController.addCancion);
router.delete("/:id/canciones/:idCancion", playlistsController.removeCancion);

module.exports = router;