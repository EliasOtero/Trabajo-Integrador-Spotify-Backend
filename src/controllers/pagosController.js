const { Pagos, Usuario, Suscripcion, DatosPagoUsuario, TipoFormaPago, TipoUsuario } = require("../models");
const { Op } = require("sequelize");

const pagosController = {
  getAll: async (req, res) => {
    try {
      const { usuarioId, desde, hasta } = req.query;
      
      const whereConditions = {};
      
      if (usuarioId) {
        whereConditions.id_usuario = usuarioId;
      }
      if (desde || hasta) {
        whereConditions.fechaPago = {};
        
        if (desde) {
          whereConditions.fechaPago[Op.gte] = new Date(desde);
        }
        
        if (hasta) {
          const fechaHasta = new Date(hasta);
          fechaHasta.setDate(fechaHasta.getDate() + 1);
          whereConditions.fechaPago[Op.lt] = fechaHasta;
        }
      }
      
      const pagos = await Pagos.findAll({
        where: whereConditions,
        include: [
          {
            model: Usuario,
            attributes: ["id_usuario", "usuario", "nyap", "email"]
          },
          {
            model: Suscripcion,
            attributes: ["id_suscripcion", "fecha_inicio", "fecha_renovacion"],
            include: [{
              model: TipoUsuario,
              attributes: ["id_tipo_usuario", "tipoUsuario"]
            }]
          },
          {
            model: DatosPagoUsuario,
            attributes: ["id_datos_pago", "nro_tarjeta_masc", "cbu"],
            include: [{
              model: TipoFormaPago,
              attributes: ["id_tipo_forma_pago", "forma_pago"]
            }]
          },
          {
            model: TipoFormaPago,
            attributes: ["id_tipo_forma_pago", "forma_pago"]
          }
        ],
        order: [["fechaPago", "DESC"]]
      });
      
      const pagosFormateados = pagos.map(pago => {
        const pagoJSON = pago.toJSON();
        
        if (pagoJSON.DatosPagoUsuario && pagoJSON.DatosPagoUsuario.nro_tarjeta_masc) {
          pagoJSON.DatosPagoUsuario.nro_tarjeta_formateado = 
            `**** **** **** ${pagoJSON.DatosPagoUsuario.nro_tarjeta_masc}`;
        }
        
        return pagoJSON;
      });
      
      res.json({
        success: true,
        data: pagosFormateados,
        count: pagosFormateados.length,
        filters: {
          usuarioId: usuarioId || null,
          desde: desde || null,
          hasta: hasta || null
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          code: "DATABASE_ERROR",
          message: "Error al obtener pagos",
          details: error.message
        }
      });
    }
  },

   create: async (req, res) => {
    try {
      const { 
        importe, 
        id_usuario, 
        id_suscripcion, 
        id_datos_pago,
        fechaPago 
      } = req.body;
      if (!importe || importe <= 0) {
        return res.status(400).json({
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "El importe es obligatorio y debe ser mayor a 0"
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
      
      if (!id_suscripcion) {
        return res.status(400).json({
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "El ID de la suscripción es obligatorio"
          }
        });
      }
      
      if (!id_datos_pago) {
        return res.status(400).json({
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "El ID del método de pago es obligatorio"
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
      
      const suscripcionExists = await Suscripcion.findOne({
        where: { 
          id_suscripcion: id_suscripcion,
          id_usuario: id_usuario 
        },
        include: [TipoUsuario]
      });
      
      if (!suscripcionExists) {
        return res.status(404).json({
          success: false,
          error: {
            code: "SUSCRIPCION_NOT_FOUND",
            message: "La suscripción no existe o no pertenece a este usuario"
          }
        });
      }
      
      const metodoPagoExists = await DatosPagoUsuario.findOne({
        where: { 
          id_datos_pago: id_datos_pago,
          id_usuario: id_usuario 
        },
        include: [TipoFormaPago]
      });
      
      if (!metodoPagoExists) {
        return res.status(404).json({
          success: false,
          error: {
            code: "METODO_PAGO_NOT_FOUND",
            message: "El método de pago no existe o no pertenece a este usuario"
          }
        });
      }
      
      const id_tipo_forma_pago = metodoPagoExists.id_tipo_forma_pago;
      
      const fechaPagoFinal = fechaPago ? new Date(fechaPago) : new Date();
      
      if (isNaN(fechaPagoFinal.getTime())) {
        return res.status(400).json({
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "La fecha de pago no es válida"
          }
        });
      }
      
      const nuevoPago = await Pagos.create({
        fechaPago: fechaPagoFinal,
        importe: parseFloat(importe),
        id_usuario,
        id_suscripcion,
        id_datos_pago,
        id_tipo_forma_pago 
      });
      
      const tipoUsuarioSuscripcion = suscripcionExists.TipoUsuario;
      
      if (tipoUsuarioSuscripcion) {
        await usuarioExists.update({
          id_tipo_usuario: tipoUsuarioSuscripcion.id_tipo_usuario
        });
      }
      
      const pagoConRelaciones = await Pagos.findByPk(nuevoPago.id_pagos, {
        include: [
          {
            model: Usuario,
            attributes: ["id_usuario", "usuario", "nyap", "email", "id_tipo_usuario"]
          },
          {
            model: Suscripcion,
            attributes: ["id_suscripcion", "fecha_inicio", "fecha_renovacion"],
            include: [{
              model: TipoUsuario,
              attributes: ["id_tipo_usuario", "tipoUsuario"]
            }]
          },
          {
            model: DatosPagoUsuario,
            attributes: ["id_datos_pago", "nro_tarjeta_masc", "cbu"],
            include: [{
              model: TipoFormaPago,
              attributes: ["id_tipo_forma_pago", "forma_pago"]
            }]
          }
        ]
      });
      
      const respuesta = pagoConRelaciones.toJSON();
      if (respuesta.DatosPagoUsuario && respuesta.DatosPagoUsuario.nro_tarjeta_masc) {
        respuesta.DatosPagoUsuario.nro_tarjeta_formateado = 
          `**** **** **** ${respuesta.DatosPagoUsuario.nro_tarjeta_masc}`;
      }
      
      respuesta.tipo_usuario_actualizado = tipoUsuarioSuscripcion ? {
        id_tipo_usuario: tipoUsuarioSuscripcion.id_tipo_usuario,
        tipoUsuario: tipoUsuarioSuscripcion.tipoUsuario
      } : null;
      
      res.status(201).json({
        success: true,
        message: "Pago registrado exitosamente",
        data: respuesta
      });
      
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          code: "DATABASE_ERROR",
          message: "Error al registrar pago",
          details: error.message
        }
      });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      
      const pago = await Pagos.findByPk(id, {
        include: [
          {
            model: Usuario,
            attributes: ["id_usuario", "usuario", "nyap", "email"]
          },
          {
            model: Suscripcion,
            attributes: ["id_suscripcion", "fecha_inicio", "fecha_renovacion"],
            include: [{
              model: TipoUsuario,
              attributes: ["id_tipo_usuario", "tipoUsuario"]
            }]
          },
          {
            model: DatosPagoUsuario,
            attributes: ["id_datos_pago", "nro_tarjeta_masc", "cbu"],
            include: [{
              model: TipoFormaPago,
              attributes: ["id_tipo_forma_pago", "forma_pago"]
            }]
          },
          {
            model: TipoFormaPago,
            attributes: ["id_tipo_forma_pago", "forma_pago"]
          }
        ]
      });
      
      if (!pago) {
        return res.status(404).json({
          success: false,
          error: {
            code: "PAGO_NOT_FOUND",
            message: "Pago no encontrado"
          }
        });
      }
      
      // Formatear respuesta
      const pagoJSON = pago.toJSON();
      if (pagoJSON.DatosPagoUsuario && pagoJSON.DatosPagoUsuario.nro_tarjeta_masc) {
        pagoJSON.DatosPagoUsuario.nro_tarjeta_formateado = 
          `**** **** **** ${pagoJSON.DatosPagoUsuario.nro_tarjeta_masc}`;
      }
      
      res.json({
        success: true,
        data: pagoJSON
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          code: "DATABASE_ERROR",
          message: "Error al obtener el pago",
          details: error.message
        }
      });
    }
  }
};

module.exports = pagosController;