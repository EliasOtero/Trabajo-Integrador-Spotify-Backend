const { Album, Artista, Discografica, Cancion } = require("../models");
const { Op } = require("sequelize");

const albumesController = {
  getAll: async (req, res) => {
    try {
      const { artistaId, q } = req.query;
      const whereConditions = {};
      
      if (artistaId) {
        whereConditions.id_artista = artistaId;
      }
      
      if (q) {
        whereConditions.album = {
          [Op.like]: `%${q}%`
        };
      }
      
      const albumes = await Album.findAll({
        where: whereConditions,
        include: [
          {
            model: Artista,
            attributes: ["id_artista", "artista"]
          },
          {
            model: Discografica,
            attributes: ["id_discografica", "discografica"]
          }
        ],
        order: [["album", "ASC"]]
      });
      
      res.json({
        success: true,
        data: albumes,
        count: albumes.length,
        filters: {
          artistaId: artistaId || null,
          search: q || null
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          code: "DATABASE_ERROR",
          message: "Error al obtener álbumes",
          details: error.message
        }
      });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      
      const album = await Album.findByPk(id, {
        include: [
          {
            model: Artista,
            attributes: ["id_artista", "artista", "imagen"]
          },
          {
            model: Discografica,
            attributes: ["id_discografica", "discografica"]
          }
        ]
      });
      
      if (!album) {
        return res.status(404).json({
          success: false,
          error: {
            code: "ALBUM_NOT_FOUND",
            message: "Álbum no encontrado"
          }
        });
      }
      
      res.json({
        success: true,
        data: album
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          code: "DATABASE_ERROR",
          message: "Error al obtener el álbum",
          details: error.message
        }
      });
    }
  },

  getCanciones: async (req, res) => {
    try {
      const { id } = req.params;
      
      
      const album = await Album.findByPk(id);
      if (!album) {
        return res.status(404).json({
          success: false,
          error: {
            code: "ALBUM_NOT_FOUND",
            message: "Álbum no encontrado"
          }
        });
      }
      
      const canciones = await Cancion.findAll({
        where: { id_album: id },
        order: [["id_cancion", "ASC"]]
      });
      
      res.json({
        success: true,
        data: {
          album: {
            id_album: album.id_album,
            album: album.album,
            imagenportada: album.imagenportada
          },
          canciones: canciones,
          count: canciones.length
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          code: "DATABASE_ERROR",
          message: "Error al obtener canciones del álbum",
          details: error.message
        }
      });
    }
  },

  
  create: async (req, res) => {
    try {
      const { album, imagenportada, anio_publicacion, id_artista, id_discografica } = req.body;
      
      
      if (!album || album.trim() === "") {
        return res.status(400).json({
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "El nombre del álbum es obligatorio"
          }
        });
      }
      
      if (!id_artista) {
        return res.status(400).json({
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "El ID del artista es obligatorio"
          }
        });
      }
      
      if (!id_discografica) {
        return res.status(400).json({
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "El ID de la discográfica es obligatorio"
          }
        });
      }
      
      const artistaExists = await Artista.findByPk(id_artista);
      if (!artistaExists) {
        return res.status(404).json({
          success: false,
          error: {
            code: "ARTISTA_NOT_FOUND",
            message: "El artista no existe"
          }
        });
      }
    
      const discograficaExists = await Discografica.findByPk(id_discografica);
      if (!discograficaExists) {
        return res.status(404).json({
          success: false,
          error: {
            code: "DISCOGRAFICA_NOT_FOUND", 
            message: "La discográfica no existe"
          }
        });
      }
      
      
      const nuevoAlbum = await Album.create({
        album: album.trim(),
        imagenportada: imagenportada || null,
        anio_publicacion: anio_publicacion || null,
        id_artista,
        id_discografica
      });
      
     
      const albumConRelaciones = await Album.findByPk(nuevoAlbum.id_album, {
        include: [
          { model: Artista },
          { model: Discografica }
        ]
      });
      
      res.status(201).json({
        success: true,
        message: "Álbum creado exitosamente",
        data: albumConRelaciones
      });
      
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(409).json({
          success: false,
          error: {
            code: "ALBUM_DUPLICADO",
            message: "Ya existe un álbum con ese nombre para este artista"
          }
        });
      }
      
      res.status(500).json({
        success: false,
        error: {
          code: "DATABASE_ERROR",
          message: "Error al crear álbum",
          details: error.message
        }
      });
    }
  }
};

module.exports = albumesController;