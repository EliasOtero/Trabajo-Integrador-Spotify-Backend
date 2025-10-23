const { Artista } = require("../models");

const artistasController = {
  getAll: async (req, res) => {
    try {
      const artistas = await Artista.findAll({
        order: [["id_artista", "ASC"]]
      });
      
      res.json({
        success: true,
        data: artistas,
        count: artistas.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          code: "DATABASE_ERROR",
          message: "Error al obtener artistas",
          details: error.message
        }
      });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      
      const artista = await Artista.findByPk(id);
      
      if (!artista) {
        return res.status(404).json({
          success: false,
          error: {
            code: "ARTISTA_NOT_FOUND",
            message: "Artista no encontrado"
          }
        });
      }
      
      res.json({
        success: true,
        data: artista
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          code: "DATABASE_ERROR",
          message: "Error al obtener el artista",
          details: error.message
        }
      });
    }
  },

  create: async (req, res) => {
    try {
      const { artista, imagen } = req.body;
      
      if (!artista || artista.trim() === "") {
        return res.status(400).json({
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "El nombre del artista es obligatorio"
          }
        });
      }
      
      const nuevoArtista = await Artista.create({
        artista: artista.trim(),
        imagen: imagen || null
      });
      
      res.status(201).json({
        success: true,
        message: "Artista creado exitosamente",
        data: nuevoArtista
      });
      
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(409).json({
          success: false,
          error: {
            code: "ARTISTA_DUPLICADO",
            message: "Ya existe un artista con ese nombre"
          }
        });
      }

      res.status(500).json({
        success: false,
        error: {
          code: "DATABASE_ERROR",
          message: "Error al crear artista",
          details: error.message
        }
      });
    }
  }
};

module.exports = artistasController;