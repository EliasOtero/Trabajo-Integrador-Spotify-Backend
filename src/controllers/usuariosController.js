const bcrypt = require("bcrypt");
const { Usuario, Pais, TipoUsuario } = require("../models");
const { Op } = require("sequelize");

const usuariosController = {
  getAll: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      const { count, rows: usuarios } = await Usuario.findAndCountAll({
        include: [
          { 
            model: Pais,
            attributes: ["id_pais", "pais"]
          },
          { 
            model: TipoUsuario,
            attributes: ["id_tipo_usuario", "tipoUsuario"]
          }
        ],
        attributes: { exclude: ["password"] },
        order: [["id_usuario", "ASC"]],
        limit: limit,
        offset: offset
      });

      res.json({
        success: true,
        data: usuarios,
        paginacion: {
          mostrando: usuarios.length,
          total: count,
          pagina: page,
          totalPaginas: Math.ceil(count / limit),
          mensaje: `Mostrando ${usuarios.length} usuarios de ${count}.`
        }
      });
    } catch (error) {
      console.error("Error en getAll usuarios:", error);
      res.status(500).json({
        success: false,
        error: {
          code: "DATABASE_ERROR",
          message: "Error al obtener usuarios",
          details: error.message
        }
      });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      
      const usuario = await Usuario.findByPk(id, {
        include: [
          { 
            model: Pais,
            attributes: ["id_pais", "pais"]
          },
          { 
            model: TipoUsuario,
            attributes: ["id_tipo_usuario", "tipoUsuario"]
          }
        ],
        attributes: { exclude: ["password"] }
      });

      if (!usuario) {
        return res.status(404).json({
          success: false,
          error: {
            code: "USUARIO_NOT_FOUND",
            message: "Usuario no encontrado"
          }
        });
      }

      res.json({
        success: true,
        data: usuario
      });
    } catch (error) {
      console.error("Error en getById usuario:", error);
      res.status(500).json({
        success: false,
        error: {
          code: "DATABASE_ERROR",
          message: "Error al obtener el usuario",
          details: error.message
        }
      });
    }
  },

  create: async (req, res) => {
    try {
      const { 
        email, 
        password, 
        usuario, 
        nyap, 
        fecha_nac, 
        sexo, 
        cp, 
        id_pais = 1, 
        id_tipo_usuario = 3,
        
        fecha_mod_password 
      } = req.body;

      // Validaciones básicas
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Email y password son obligatorios"
          }
        });
      }

      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          error: {
            code: "VALIDATION_ERROR", 
            message: "La contraseña debe tener al menos 6 caracteres"
          }
        });
      }

      const usuarioExistente = await Usuario.findOne({ where: { email } });
      if (usuarioExistente) {
        return res.status(409).json({
          success: false,
          error: {
            code: "EMAIL_DUPLICADO",
            message: "El email ya está registrado"
          }
        });
      }

      // Hash de la contraseña
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      const usuarioData = {
        email: email.toLowerCase().trim(),
        password: passwordHash,
        usuario: usuario || `usuario_${Date.now()}`,
        nyap: nyap || "Nombre Temporal",
        fecha_nac: fecha_nac || "2000-01-01",
        sexo: sexo || "O",
        cp,
        id_pais,
        id_tipo_usuario,
      };

      // Solo usar fecha_mod_password si se proporciona
      if (fecha_mod_password) {
        usuarioData.fecha_mod_password = fecha_mod_password;
      } else {
        usuarioData.fecha_mod_password = new Date();
      }

      const nuevoUsuario = await Usuario.create(usuarioData);

      // No enviar password en la respuesta
      const usuarioResponse = { ...nuevoUsuario.toJSON() };
      delete usuarioResponse.password;

      res.status(201).json({
        success: true,
        data: usuarioResponse,
        message: "Usuario creado exitosamente"
      });
    } catch (error) {
      console.error("Error en create usuario:", error);
      
      if (error.name === "SequelizeValidationError") {
        return res.status(400).json({
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Datos de usuario inválidos",
            details: error.errors.map(err => err.message)
          }
        });
      }

      res.status(500).json({
        success: false,
        error: {
          code: "DATABASE_ERROR",
          message: "Error al crear usuario",
          details: error.message
        }
      });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { 
        email, 
        password, 
        usuario, 
        nyap, 
        fecha_nac, 
        sexo, 
        cp, 
        id_pais, 
        id_tipo_usuario,
        
        fecha_mod_password 
      } = req.body;

      const usuarioExistente = await Usuario.findByPk(id);
      if (!usuarioExistente) {
        return res.status(404).json({
          success: false,
          error: {
            code: "NOT_FOUND",
            message: "Usuario no encontrado"
          }
        });
      }

      if (email && email !== usuarioExistente.email) {
        const emailExistente = await Usuario.findOne({ where: { email } });
        if (emailExistente) {
          return res.status(409).json({
            success: false,
            error: {
              code: "EMAIL_DUPLICADO",
              message: "El email ya está registrado"
            }
          });
        }
      }

      const updateData = {
        email: email ? email.toLowerCase().trim() : usuarioExistente.email,
        usuario: usuario || usuarioExistente.usuario,
        nyap: nyap || usuarioExistente.nyap,
        fecha_nac: fecha_nac || usuarioExistente.fecha_nac,
        sexo: sexo || usuarioExistente.sexo,
        cp: cp !== undefined ? cp : usuarioExistente.cp,
        id_pais: id_pais || usuarioExistente.id_pais,
        id_tipo_usuario: id_tipo_usuario || usuarioExistente.id_tipo_usuario
      };

      // Si se proporciona fecha_mod_password, usarla (para testing)
      if (fecha_mod_password !== undefined) {
        updateData.fecha_mod_password = fecha_mod_password;
      }

      if (password) {
        if (password.length < 6) {
          return res.status(400).json({
            success: false,
            error: {
              code: "VALIDATION_ERROR",
              message: "La contraseña debe tener al menos 6 caracteres"
            }
          });
        }
        const saltRounds = 10;
        updateData.password = await bcrypt.hash(password, saltRounds);
        
        if (fecha_mod_password === undefined) {
          updateData.fecha_mod_password = new Date();
        }
      }

      await usuarioExistente.update(updateData);

      const usuarioActualizado = await Usuario.findByPk(id, {
        include: [
          { model: Pais },
          { model: TipoUsuario }
        ],
        attributes: { exclude: ["password"] }
      });

      res.json({
        success: true,
        data: usuarioActualizado,
        message: "Usuario actualizado exitosamente"
      });
    } catch (error) {
      console.error("Error en update usuario:", error);
      
      if (error.name === "SequelizeValidationError") {
        return res.status(400).json({
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Datos de usuario inválidos",
            details: error.errors.map(err => err.message)
          }
        });
      }

      res.status(500).json({
        success: false,
        error: {
          code: "DATABASE_ERROR",
          message: "Error al actualizar usuario",
          details: error.message
        }
      });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return res.status(404).json({
          success: false,
          error: {
            code: "NOT_FOUND",
            message: "Usuario no encontrado"
          }
        });
      }

      await usuario.update({ activo: false});

      res.status(200).json({
        success: true,
        message: "Usuario eliminado exitosamente"
      });
    } catch (error) {
      console.error("Error en delete usuario:", error);
      res.status(500).json({
        success: false,
        error: {
          code: "DATABASE_ERROR",
          message: "Error al eliminar usuario",
          details: error.message
        }
      });
    }
  },

  getPasswordVencidas: async (req, res) => {
    try {
      const fechaLimite = new Date();
      fechaLimite.setDate(fechaLimite.getDate() - 90); // 90 días atrás

      const usuarios = await Usuario.findAll({
        where: {
          fecha_mod_password: {
            [Op.lt]: fechaLimite
          }
        },
        attributes: ["id_usuario", "email", "usuario", "fecha_mod_password"],
        order: [["fecha_mod_password", "ASC"]]
      });

      res.json({
        success: true,
        data: usuarios,
        count: usuarios.length,
        message: usuarios.length > 0 
          ? `${usuarios.length} usuarios con contraseñas vencidas` 
          : "No hay usuarios con contraseñas vencidas"
      });
    } catch (error) {
      console.error("Error en getPasswordVencidas:", error);
      res.status(500).json({
        success: false,
        error: {
          code: "DATABASE_ERROR",
          message: "Error al obtener usuarios con contraseñas vencidas",
          details: error.message
        }
      });
    }
  }
};

module.exports = usuariosController;