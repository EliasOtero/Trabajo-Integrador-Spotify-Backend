const { Discografica, Pais } = require("../models");
const { Op } = require("sequelize");

const discograficasController = {
  getAll: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      const { count, rows: discograficas } = await Discografica.findAndCountAll({
        include: [
          {
            model: Pais,
            attributes: ["id_pais", "pais"]
          }
        ],
        order: [["id_discografica", "ASC"]],
        limit: limit,
        offset: offset
      });

      res.json({
        success: true,
        data: discograficas,
        paginacion: {
          mostrando: discograficas.length,
          total: count,
          pagina: page,
          totalPaginas: Math.ceil(count / limit),
          mensaje: `Mostrando ${discograficas.length} discográficas de ${count}.`
        }
      });
    } catch (error) {
      console.error("Error en getAll discograficas:", error);
      res.status(500).json({
        success: false,
        error: {
          code: "DATABASE_ERROR",
          message: "Error al obtener discográficas",
          details: error.message
        }
      });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      
      const discografica = await Discografica.findByPk(id, {
        include: [
          {
            model: Pais,
            attributes: ["id_pais", "pais"]
          }
        ]
      });

      if (!discografica) {
        return res.status(404).json({
          success: false,
          error: {
            code: "DISCOGRAFICA_NOT_FOUND",
            message: "Discográfica no encontrada"
          }
        });
      }

      res.json({
        success: true,
        data: discografica
      });
    } catch (error) {
      console.error("Error en getById discografica:", error);
      res.status(500).json({
        success: false,
        error: {
          code: "DATABASE_ERROR",
          message: "Error al obtener la discográfica",
          details: error.message
        }
      });
    }
  },

  getByPais: async (req, res) => {
    try {
      const { idPais } = req.params;
      
      const discograficas = await Discografica.findAll({
        where: { id_pais: idPais },
        include: [
          {
            model: Pais,
            attributes: ["id_pais", "pais"]
          }
        ],
        order: [["id_discografica", "ASC"]]
      });

      res.json({
        success: true,
        data: discograficas,
        count: discograficas.length,
        message: discograficas.length > 0 
          ? `${discograficas.length} discográficas encontradas en este país` 
          : "No se encontraron discográficas en este país"
      });
    } catch (error) {
      console.error("Error en getByPais discograficas:", error);
      res.status(500).json({
        success: false,
        error: {
          code: "DATABASE_ERROR",
          message: "Error al obtener discográficas por país",
          details: error.message
        }
      });
    }
  },

  create: async (req, res) => {
    try {
      const { discografica, id_pais } = req.body;

      if (!discografica || !id_pais) {
        return res.status(400).json({
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Nombre de discográfica y ID de país son obligatorios"
          }
        });
      }

      const discograficaExistente = await Discografica.findOne({
        where: {
          discografica: discografica.trim(),
          id_pais: id_pais
        }
      });

      if (discograficaExistente) {
        return res.status(409).json({
          success: false,
          error: {
            code: "DISCOGRAFICA_DUPLICADA",
            message: "Ya existe una discográfica con este nombre en el mismo país"
          }
        });
      }

      const paisExistente = await Pais.findByPk(id_pais);
      if (!paisExistente) {
        return res.status(404).json({
          success: false,
          error: {
            code: "PAIS_NOT_FOUND", 
            message: "El país especificado no existe"
          }
        });
      }

      const nuevaDiscografica = await Discografica.create({
        discografica: discografica.trim(),
        id_pais: id_pais
      });

      const discograficaConPais = await Discografica.findByPk(nuevaDiscografica.id_discografica, {
        include: [
          {
            model: Pais,
            attributes: ["id_pais", "pais"]
          }
        ]
      });

      res.status(201).json({
        success: true,
        data: discograficaConPais,
        message: "Discográfica creada exitosamente"
      });
    } catch (error) {
      console.error("Error en create discografica:", error);
      
      if (error.name === "SequelizeValidationError") {
        return res.status(400).json({
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Datos de discográfica inválidos",
            details: error.errors.map(err => err.message)
          }
        });
      }

      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(409).json({
          success: false,
          error: {
            code: "DISCOGRAFICA_DUPLICADA",
            message: "Ya existe una discográfica con este nombre en el mismo país"
          }
        });
      }

      res.status(500).json({
        success: false,
        error: {
          code: "DATABASE_ERROR",
          message: "Error al crear discográfica",
          details: error.message
        }
      });
    }
  }
};

module.exports = discograficasController;