const { Genero } = require("../models");

const generosController = {
  getAll: async (req, res) => {
    try {
      const generos = await Genero.findAll({
        order: [["id_genero", "ASC"]]
      });
      
      res.json({
        success: true,
        data: generos,
        count: generos.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          code: "DATABASE_ERROR",
          message: "Error al obtener géneros",
          details: error.message
        }
      });
    }
  },

  create: async (req, res) => {
    try {
      const { genero } = req.body;
      
      if (!genero || genero.trim() === "") {
        return res.status(400).json({
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "El nombre del género es obligatorio"
          }
        });
      }
      
      const nuevoGenero = await Genero.create({
        genero: genero.trim()
      });
      
      res.status(201).json({
        success: true,
        message: "Género creado exitosamente",
        data: nuevoGenero
      });
      
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(409).json({
          success: false,
          error: {
            code: "GENERO_DUPLICADO",
            message: "Ya existe un género con ese nombre"
          }
        });
      }
      
      res.status(500).json({
        success: false,
        error: {
          code: "DATABASE_ERROR",
          message: "Error al crear género",
          details: error.message
        }
      });
    }
  }
};

module.exports = generosController;