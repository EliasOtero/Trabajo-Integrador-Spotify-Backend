const { Cancion, Album, Artista, Genero, CancionGenero, Op } = require("../models");

const cancionesController = {
  getAll: async (req, res) => {
    try {
      const { genero, artistaId, albumId, q } = req.query;
      
      // Construir condiciones de filtro
      const whereConditions = {};
      const includeConditions = [];
      
      if (albumId) {
        whereConditions.id_album = albumId;
      }
      
      if (q) {
        whereConditions.cancion = {
          [Op.like]: `%${q}%`
        };
      }
      
      // Incluir Album y Artista siempre
      includeConditions.push({
        model: Album,
        attributes: ["id_album", "album", "imagenportada"],
        include: [{
          model: Artista,
          attributes: ["id_artista", "artista"]
        }]
      });
      
      // Filtro por género
      if (genero) {
        includeConditions.push({
          model: Genero,
          where: { id_genero: genero },
          attributes: [],
          through: { attributes: [] }
        });
      }
      
      // Filtro por artista
      if (artistaId) {
        includeConditions.push({
          model: Album,
          where: { id_artista: artistaId },
          attributes: [],
          include: [{
            model: Artista,
            attributes: []
          }]
        });
      }
      
      const canciones = await Cancion.findAll({
        where: whereConditions,
        include: includeConditions,
        order: [["id_cancion", "ASC"]]
      });
      
      res.json({
        success: true,
        data: canciones,
        count: canciones.length,
        filters: {
          genero: genero || null,
          artistaId: artistaId || null,
          albumId: albumId || null,
          search: q || null
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          code: "DATABASE_ERROR",
          message: "Error al obtener canciones",
          details: error.message
        }
      });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      
      const cancion = await Cancion.findByPk(id, {
        include: [
          {
            model: Album,
            attributes: ["id_album", "album", "imagenportada"],
            include: [{
              model: Artista,
              attributes: ["id_artista", "artista"]
            }]
          },
          {
            model: Genero,
            attributes: ["id_genero", "genero"],
            through: { attributes: [] }
          }
        ]
      });
      
      if (!cancion) {
        return res.status(404).json({
          success: false,
          error: {
            code: "CANCION_NOT_FOUND",
            message: "Canción no encontrada"
          }
        });
      }
      
      res.json({
        success: true,
        data: cancion
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          code: "DATABASE_ERROR",
          message: "Error al obtener la canción",
          details: error.message
        }
      });
    }
  },

  create: async (req, res) => {
    try {
      const { cancion, duracion_seg, id_album, reproducciones, likes } = req.body;
      if (!cancion || cancion.trim() === "") {
        return res.status(400).json({
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "El nombre de la canción es obligatorio"
          }
        });
      }
      
      if (!duracion_seg || duracion_seg <= 0) {
        return res.status(400).json({
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "La duración debe ser un número mayor a 0"
          }
        });
      }
      
      if (!id_album) {
        return res.status(400).json({
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "El ID del álbum es obligatorio"
          }
        });
      }
      
      const albumExists = await Album.findByPk(id_album);
      if (!albumExists) {
        return res.status(404).json({
          success: false,
          error: {
            code: "ALBUM_NOT_FOUND",
            message: "El álbum no existe"
          }
        });
      }

      const nuevaCancion = await Cancion.create({
        cancion: cancion.trim(),
        duracion_seg: parseInt(duracion_seg),
        id_album,
        reproducciones: reproducciones || 0,
        likes: likes || 0
      });
      
      const cancionConRelaciones = await Cancion.findByPk(nuevaCancion.id_cancion, {
        include: [
          {
            model: Album,
            include: [Artista]
          }
        ]
      });
      
      res.status(201).json({
        success: true,
        message: "Canción creada exitosamente",
        data: cancionConRelaciones
      });
      
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          code: "DATABASE_ERROR",
          message: "Error al crear canción",
          details: error.message
        }
      });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { cancion, duracion_seg, reproducciones, likes } = req.body;
      
      const cancionExistente = await Cancion.findByPk(id);
      if (!cancionExistente) {
        return res.status(404).json({
          success: false,
          error: {
            code: "CANCION_NOT_FOUND",
            message: "Canción no encontrada"
          }
        });
      }
      
      if (duracion_seg && duracion_seg <= 0) {
        return res.status(400).json({
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "La duración debe ser un número mayor a 0"
          }
        });
      }
      
      await cancionExistente.update({
        cancion: cancion || cancionExistente.cancion,
        duracion_seg: duracion_seg || cancionExistente.duracion_seg,
        reproducciones: reproducciones || cancionExistente.reproducciones,
        likes: likes || cancionExistente.likes
      });
      
      const cancionActualizada = await Cancion.findByPk(id, {
        include: [
          {
            model: Album,
            include: [Artista]
          }
        ]
      });
      
      res.json({
        success: true,
        message: "Canción actualizada exitosamente",
        data: cancionActualizada
      });
      
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          code: "DATABASE_ERROR",
          message: "Error al actualizar canción",
          details: error.message
        }
      });
    }
  },

  addGenero: async (req, res) => {
    try {
      const { id } = req.params;
      const { id_genero } = req.body;
      
      if (!id_genero) {
        return res.status(400).json({
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "El ID del género es obligatorio"
          }
        });
      }
      
      const cancion = await Cancion.findByPk(id);
      if (!cancion) {
        return res.status(404).json({
          success: false,
          error: {
            code: "CANCION_NOT_FOUND",
            message: "Canción no encontrada"
          }
        });
      }
      
      const genero = await Genero.findByPk(id_genero);
      if (!genero) {
        return res.status(404).json({
          success: false,
          error: {
            code: "GENERO_NOT_FOUND",
            message: "Género no encontrado"
          }
        });
      }
      
      // Asociar género a canción
      await cancion.addGenero(genero);
      
      res.json({
        success: true,
        message: "Género asociado a la canción exitosamente",
        data: {
          cancion: {
            id_cancion: cancion.id_cancion,
            cancion: cancion.cancion
          },
          genero: {
            id_genero: genero.id_genero,
            genero: genero.genero
          }
        }
      });
      
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(409).json({
          success: false,
          error: {
            code: "GENERO_DUPLICADO",
            message: "La canción ya tiene asociado este género"
          }
        });
      }
      
      res.status(500).json({
        success: false,
        error: {
          code: "DATABASE_ERROR",
          message: "Error al asociar género",
          details: error.message
        }
      });
    }
  },

  removeGenero: async (req, res) => {
    try {
      const { id, idGenero } = req.params;
      
      const cancion = await Cancion.findByPk(id);
      if (!cancion) {
        return res.status(404).json({
          success: false,
          error: {
            code: "CANCION_NOT_FOUND",
            message: "Canción no encontrada"
          }
        });
      }
      
      const genero = await Genero.findByPk(idGenero);
      if (!genero) {
        return res.status(404).json({
          success: false,
          error: {
            code: "GENERO_NOT_FOUND",
            message: "Género no encontrado"
          }
        });
      }
      
      const asociacion = await CancionGenero.findOne({
        where: {
          id_cancion: id,
          id_genero: idGenero
        }
      });
      
      if (!asociacion) {
        return res.status(404).json({
          success: false,
          error: {
            code: "ASOCIACION_NOT_FOUND",
            message: "La canción no tiene asociado este género"
          }
        });
      }
      
      await cancion.removeGenero(genero);
      
      res.json({
        success: true,
        message: "Género desasociado de la canción exitosamente"
      });
      
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          code: "DATABASE_ERROR",
          message: "Error al desasociar género",
          details: error.message
        }
      });
    }
  }
};

module.exports = cancionesController;