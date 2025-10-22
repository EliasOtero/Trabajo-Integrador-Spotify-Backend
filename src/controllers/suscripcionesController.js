const { Suscripcion, Usuario, TipoUsuario } = require("../models");

const suscripcionesController = {
  getAll: async (req, res) => {
    try {
      const { usuarioId, tipoUsuario, activa } = req.query;

      const whereConditions = {};
      const includeConditions = [];
      
      if (usuarioId) {
        whereConditions.id_usuario = usuarioId;
      }
      
      if (tipoUsuario) {
        whereConditions.id_tipo_usuario = tipoUsuario;
      }
      
      if (activa === "true") {
        whereConditions.fecha_renovacion = {
          [Op.gt]: new Date()
        };
      }
      
      includeConditions.push(
        {
          model: Usuario,
          attributes: ["id_usuario", "usuario", "nyap", "email"]
        },
        {
          model: TipoUsuario,
          attributes: ["id_tipo_usuario", "tipoUsuario"]
        }
      );
      
      const suscripciones = await Suscripcion.findAll({
        where: whereConditions,
        include: includeConditions,
        order: [["fecha_inicio", "DESC"]]
      });
      
      res.json({
        success: true,
        data: suscripciones,
        count: suscripciones.length,
        filters: {
          usuarioId: usuarioId || null,
          tipoUsuario: tipoUsuario || null,
          activa: activa || null
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          code: "DATABASE_ERROR",
          message: "Error al obtener suscripciones",
          details: error.message
        }
      });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      
      const suscripcion = await Suscripcion.findByPk(id, {
        include: [
          {
            model: Usuario,
            attributes: ["id_usuario", "usuario", "nyap", "email"]
          },
          {
            model: TipoUsuario,
            attributes: ["id_tipo_usuario", "tipoUsuario"]
          }
        ]
      });
      
      if (!suscripcion) {
        return res.status(404).json({
          success: false,
          error: {
            code: "SUSCRIPCION_NOT_FOUND",
            message: "Suscripción no encontrada"
          }
        });
      }
      
      res.json({
        success: true,
        data: suscripcion
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          code: "DATABASE_ERROR",
          message: "Error al obtener la suscripción",
          details: error.message
        }
      });
    }
  },

  create: async (req, res) => {
    try {
      const { fecha_inicio, fecha_renovacion, id_usuario, id_tipo_usuario } = req.body;
      
      if (!fecha_inicio) {
        return res.status(400).json({
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "La fecha de inicio es obligatoria"
          }
        });
      }
      
      if (!id_usuario) {
        return res.status(400).json({
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "El ID del usuario es obligatorio"
          }
        });
      }
      
      if (!id_tipo_usuario) {
        return res.status(400).json({
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "El ID del tipo de usuario es obligatorio"
          }
        });
      }
      
      const fechaInicio = new Date(fecha_inicio);
      let fechaRenovacion = fecha_renovacion ? new Date(fecha_renovacion) : null;
      
      if (isNaN(fechaInicio.getTime())) {
        return res.status(400).json({
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "La fecha de inicio no es válida"
          }
        });
      }
      
      if (fechaRenovacion && isNaN(fechaRenovacion.getTime())) {
        return res.status(400).json({
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "La fecha de renovación no es válida"
          }
        });
      }
      
      if (fechaRenovacion && fechaRenovacion <= fechaInicio) {
        return res.status(400).json({
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "La fecha de renovación debe ser posterior a la fecha de inicio"
          }
        });
      }
      
      const usuarioExists = await Usuario.findByPk(id_usuario);
      if (!usuarioExists) {
        return res.status(404).json({
          success: false,
          error: {
            code: "USUARIO_NOT_FOUND",
            message: "El usuario no existe"
          }
        });
      }
      
      const tipoUsuarioExists = await TipoUsuario.findByPk(id_tipo_usuario);
      if (!tipoUsuarioExists) {
        return res.status(404).json({
          success: false,
          error: {
            code: "TIPO_USUARIO_NOT_FOUND",
            message: "El tipo de usuario no existe"
          }
        });
      }
      
      const nuevaSuscripcion = await Suscripcion.create({
        fecha_inicio: fechaInicio,
        fecha_renovacion: fechaRenovacion,
        id_usuario,
        id_tipo_usuario
      });
      
      await usuarioExists.update({
        id_tipo_usuario: id_tipo_usuario
      });
      
      const suscripcionConRelaciones = await Suscripcion.findByPk(nuevaSuscripcion.id_suscripcion, {
        include: [
          {
            model: Usuario,
            attributes: ["id_usuario", "usuario", "nyap", "email"]
          },
          {
            model: TipoUsuario,
            attributes: ["id_tipo_usuario", "tipoUsuario"]
          }
        ]
      });
      
      res.status(201).json({
        success: true,
        message: "Suscripción creada exitosamente",
        data: suscripcionConRelaciones
      });
      
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(409).json({
          success: false,
          error: {
            code: "SUSCRIPCION_DUPLICADA",
            message: "Ya existe una suscripción para este usuario con la misma fecha de inicio"
          }
        });
      }
      
      // Otros errores
      res.status(500).json({
        success: false,
        error: {
          code: "DATABASE_ERROR",
          message: "Error al crear suscripción",
          details: error.message
        }
      });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { fecha_renovacion, id_tipo_usuario } = req.body;
      
      const suscripcionExistente = await Suscripcion.findByPk(id, {
        include: [Usuario]
      });
      
      if (!suscripcionExistente) {
        return res.status(404).json({
          success: false,
          error: {
            code: "SUSCRIPCION_NOT_FOUND",
            message: "Suscripción no encontrada"
          }
        });
      }
      
      const updateData = {};
      
      if (fecha_renovacion) {
        const fechaRenovacion = new Date(fecha_renovacion);
        
        if (isNaN(fechaRenovacion.getTime())) {
          return res.status(400).json({
            success: false,
            error: {
              code: "VALIDATION_ERROR",
              message: "La fecha de renovación no es válida"
            }
          });
        }
        
        if (fechaRenovacion <= suscripcionExistente.fecha_inicio) {
          return res.status(400).json({
            success: false,
            error: {
              code: "VALIDATION_ERROR",
              message: "La fecha de renovación debe ser posterior a la fecha de inicio"
            }
          });
        }
        
        updateData.fecha_renovacion = fechaRenovacion;
      }
      
      if (id_tipo_usuario) {
        const tipoUsuarioExists = await TipoUsuario.findByPk(id_tipo_usuario);
        if (!tipoUsuarioExists) {
          return res.status(404).json({
            success: false,
            error: {
              code: "TIPO_USUARIO_NOT_FOUND",
              message: "El tipo de usuario no existe"
            }
          });
        }
        
        updateData.id_tipo_usuario = id_tipo_usuario;
        
        if (suscripcionExistente.Usuario) {
          await suscripcionExistente.Usuario.update({
            id_tipo_usuario: id_tipo_usuario
          });
        }
      }
      
      await suscripcionExistente.update(updateData);
      
      const suscripcionActualizada = await Suscripcion.findByPk(id, {
        include: [
          {
            model: Usuario,
            attributes: ["id_usuario", "usuario", "nyap", "email"]
          },
          {
            model: TipoUsuario,
            attributes: ["id_tipo_usuario", "tipoUsuario"]
          }
        ]
      });
      
      res.json({
        success: true,
        message: "Suscripción actualizada exitosamente",
        data: suscripcionActualizada
      });
      
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          code: "DATABASE_ERROR",
          message: "Error al actualizar suscripción",
          details: error.message
        }
      });
    }
  }
};

module.exports = suscripcionesController;