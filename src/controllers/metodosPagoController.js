const { DatosPagoUsuario, Usuario, TipoFormaPago } = require("../models");
const { Op } = require("sequelize");

const metodosPagoController = {
  getAll: async (req, res) => {
    try {
      const { usuarioId } = req.query;
      
      if (!usuarioId) {
        return res.status(400).json({
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "El parámetro usuarioId es obligatorio"
          }
        });
      }
      
      const usuarioExists = await Usuario.findByPk(usuarioId);
      if (!usuarioExists) {
        return res.status(404).json({
          success: false,
          error: {
            code: "USUARIO_NOT_FOUND",
            message: "Usuario no encontrado"
          }
        });
      }
      
      const metodosPago = await DatosPagoUsuario.findAll({
        where: { id_usuario: usuarioId },
        include: [
          {
            model: Usuario,
            attributes: ["id_usuario", "usuario", "nyap"]
          },
          {
            model: TipoFormaPago,
            attributes: ["id_tipo_forma_pago", "forma_pago"]
          }
        ],
        order: [["id_datos_pago", "DESC"]]
      });
    
      const metodosPagoFormateados = metodosPago.map(metodo => {
        const metodoJSON = metodo.toJSON();
        
        if (metodoJSON.nro_tarjeta_masc) {
          metodoJSON.nro_tarjeta_formateado = `**** **** **** ${metodoJSON.nro_tarjeta_masc}`;
        }
        
        return metodoJSON;
      });
      
      res.json({
        success: true,
        data: metodosPagoFormateados,
        count: metodosPagoFormateados.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          code: "DATABASE_ERROR",
          message: "Error al obtener métodos de pago",
          details: error.message
        }
      });
    }
  },

  create: async (req, res) => {
    try {
      const { 
        cbu, 
        banco_codigo, 
        nro_tarjeta,  
        mes_caduca, 
        anio_caduca, 
        id_usuario, 
        tipo_forma_pago  
      } = req.body;
      
      console.log("Request body recibido:", req.body); // Para debug
      
      if (!id_usuario) {
        return res.status(400).json({
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "El ID del usuario es obligatorio"
          }
        });
      }
      
      if (!tipo_forma_pago) {
        return res.status(400).json({
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "El tipo de forma de pago es obligatorio"
          }
        });
      }
      
      const tipoFormaPago = await TipoFormaPago.findOne({
        where: {
          forma_pago: {
            [Op.like]: `%${tipo_forma_pago}%`
          }
        }
      });
      
      if (!tipoFormaPago) {
        const tiposDisponibles = await TipoFormaPago.findAll({
          attributes: ["id_tipo_forma_pago", "forma_pago"]
        });
        
        return res.status(404).json({
          success: false,
          error: {
            code: "TIPO_FORMA_PAGO_NOT_FOUND",
            message: `Tipo de forma de pago no encontrado: "${tipo_forma_pago}"`,
            tipos_disponibles: tiposDisponibles.map(t => t.forma_pago)
          }
        });
      }
      
      const id_tipo_forma_pago = tipoFormaPago.id_tipo_forma_pago;
      const nombreFormaPago = tipoFormaPago.forma_pago;
      
      console.log("Tipo de pago encontrado:", { id_tipo_forma_pago, nombreFormaPago }); // Para debug
      
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
      
      let nro_tarjeta_masc = null;
      if (nro_tarjeta) {
        const nroLimpio = nro_tarjeta.toString().replace(/\D/g, "");
        
        if (nroLimpio.length < 4) {
          return res.status(400).json({
            success: false,
            error: {
              code: "VALIDATION_ERROR",
              message: "El número de tarjeta debe tener al menos 4 dígitos"
            }
          });
        }
        nro_tarjeta_masc = nroLimpio.slice(-4);
      }
      
      const tipoPago = nombreFormaPago.toLowerCase();
      
      if (tipoPago.includes("tarjeta") || tipoPago.includes("credito") || tipoPago.includes("débito") || tipoPago.includes("debito")) {
        if (!nro_tarjeta) {
          return res.status(400).json({
            success: false,
            error: {
              code: "VALIDATION_ERROR",
              message: "El número de tarjeta es obligatorio para pagos con tarjeta"
            }
          });
        }
        
        if (!mes_caduca || !anio_caduca) {
          return res.status(400).json({
            success: false,
            error: {
              code: "VALIDATION_ERROR",
              message: "El mes y año de caducidad son obligatorios para tarjetas"
            }
          });
        }
        
        if (mes_caduca < 1 || mes_caduca > 12) {
          return res.status(400).json({
            success: false,
            error: {
              code: "VALIDATION_ERROR",
              message: "El mes de caducidad debe estar entre 1 y 12"
            }
          });
        }
        
        const ahora = new Date();
        const añoActual = ahora.getFullYear();
        const mesActual = ahora.getMonth() + 1;
        
        if (anio_caduca < añoActual || (anio_caduca === añoActual && mes_caduca < mesActual)) {
          return res.status(400).json({
            success: false,
            error: {
              code: "VALIDATION_ERROR",
              message: "La tarjeta está vencida"
            }
          });
        }
        
      } else if (tipoPago.includes("transferencia") || tipoPago.includes("cbu")) {
        if (!cbu) {
          return res.status(400).json({
            success: false,
            error: {
              code: "VALIDATION_ERROR",
              message: "El CBU es obligatorio para transferencias"
            }
          });
        }
        
        if (!banco_codigo) {
          return res.status(400).json({
            success: false,
            error: {
              code: "VALIDATION_ERROR",
              message: "El código de banco es obligatorio para transferencias"
            }
          });
        }
      }
      
      const nuevoMetodoPago = await DatosPagoUsuario.create({
        cbu: cbu || null,
        banco_codigo: banco_codigo || null,
        nro_tarjeta_masc: nro_tarjeta_masc,
        mes_caduca: mes_caduca || null,
        anio_caduca: anio_caduca || null,
        id_usuario,
        id_tipo_forma_pago
      });
      
      const metodoPagoConRelaciones = await DatosPagoUsuario.findByPk(nuevoMetodoPago.id_datos_pago, {
        include: [
          {
            model: Usuario,
            attributes: ["id_usuario", "usuario", "nyap"]
          },
          {
            model: TipoFormaPago,
            attributes: ["id_tipo_forma_pago", "forma_pago"]
          }
        ]
      });
      
      const respuesta = metodoPagoConRelaciones.toJSON();
      if (respuesta.nro_tarjeta_masc) {
        respuesta.nro_tarjeta_formateado = `**** **** **** ${respuesta.nro_tarjeta_masc}`;
      }
      
      res.status(201).json({
        success: true,
        message: "Método de pago creado exitosamente",
        data: respuesta
      });
      
    } catch (error) {
      console.error("Error en create método pago:", error);
      res.status(500).json({
        success: false,
        error: {
          code: "DATABASE_ERROR",
          message: "Error al crear método de pago",
          details: error.message
        }
      });
    }
  }
};

module.exports = metodosPagoController;