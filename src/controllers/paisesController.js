const { Pais, sequelize } = require("../models");
const { Op } = require("sequelize");

const paisesController = {
  getAll: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      const { count, rows: paises } = await Pais.findAndCountAll({
        order: [["id_pais", "ASC"]], 
        limit: limit,
        offset: offset
      });

      res.json({
        success: true,
        data: paises,
        paginacion: {
          mostrando: paises.length,
          total: count,
          pagina: page,
          totalPaginas: Math.ceil(count / limit),
          mensaje: `Mostrando ${paises.length} países de ${count}.`
        }
      });
    } catch (error) {
      console.error("Error en getAll paises:", error);
      res.status(500).json({
        success: false,
        error: {
          code: "DATABASE_ERROR",
          message: "Error al obtener países",
          details: error.message
        }
      });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      
      const pais = await Pais.findByPk(id);

      if (!pais) {
        return res.status(404).json({
          success: false,
          error: {
            code: "PAIS_NOT_FOUND",
            message: "País no encontrado"
          }
        });
      }

      res.json({
        success: true,
        data: pais
      });
    } catch (error) {
      console.error("Error en getById pais:", error);
      res.status(500).json({
        success: false,
        error: {
          code: "DATABASE_ERROR",
          message: "Error al obtener el país",
          details: error.message
        }
      });
    }
  },

  create: async (req, res) => {
    try {
      const { pais } = req.body;

      if (!pais || pais.trim() === '') {
        return res.status(400).json({
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "El nombre del país es obligatorio"
          }
        });
      }

      const nombrePais = pais.trim();

      const paisExistente = await Pais.findOne({
        where: sequelize.where(
          sequelize.fn('LOWER', sequelize.col('pais')), 
          '=', 
          nombrePais.toLowerCase()
        )
      });

      if (paisExistente) {
        return res.status(409).json({
          success: false,
          error: {
            code: "PAIS_DUPLICADO",
            message: "Ya existe un país con este nombre"
          }
        });
      }

      const nuevoPais = await Pais.create({
        pais: nombrePais
      });

      res.status(201).json({
        success: true,
        data: nuevoPais,
        message: "País creado exitosamente"
      });
    } catch (error) {
      console.error("Error en create pais:", error);
      
      if (error.name === "SequelizeValidationError") {
        return res.status(400).json({
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Datos de país inválidos",
            details: error.errors.map(err => err.message)
          }
        });
      }

      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(409).json({
          success: false,
          error: {
            code: "PAIS_DUPLICADO",
            message: "Ya existe un país con este nombre"
          }
        });
      }

      res.status(500).json({
        success: false,
        error: {
          code: "DATABASE_ERROR",
          message: "Error al crear país",
          details: error.message
        }
      });
    }
  }
};

module.exports = paisesController;