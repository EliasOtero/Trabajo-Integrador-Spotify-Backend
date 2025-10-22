const { Playlist, Usuario, Cancion, PlaylistCancion, Album, Artista, } = require("../models");

const playlistsController = {
  getAll: async (req, res) => {
    try {
      const { usuarioId, estado } = req.query;
      
      const whereConditions = {};
      
      if (usuarioId) {
        whereConditions.id_usuario = usuarioId;
      }
      
      if (estado) {
        whereConditions.estado = estado;
      }
      
      const playlists = await Playlist.findAll({
        where: whereConditions,
        include: [
          {
            model: Usuario,
            attributes: ["id_usuario", "usuario", "nyap"]
          },
          {
            model: Cancion,
            attributes: ["id_cancion", "cancion", "duracion_seg"],
            through: { attributes: ["orden", "fecha_agregada"] },
            include: [{
              model: Album,
              attributes: ["album", "imagenportada"],
              include: [{
                model: Artista,
                attributes: ["artista"]
              }]
            }]
          }
        ],
        order: [["fecha_creacion", "DESC"]]
      });
      
      const playlistsConCount = playlists.map(playlist => {
        const playlistJSON = playlist.toJSON();
        playlistJSON.cantidad_canciones = playlistJSON.Cancions ? playlistJSON.Cancions.length : 0;
        return playlistJSON;
      });
      
      res.json({
        success: true,
        data: playlistsConCount,
        count: playlistsConCount.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          code: "DATABASE_ERROR",
          message: "Error al obtener playlists",
          details: error.message
        }
      });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      
      const playlist = await Playlist.findByPk(id, {
        include: [
          {
            model: Usuario,
            attributes: ["id_usuario", "usuario", "nyap"]
          },
          {
            model: Cancion,
            attributes: ["id_cancion", "cancion", "duracion_seg"],
            through: { 
              attributes: ["orden", "fecha_agregada"] 
            },
            include: [{
              model: Album,
              attributes: ["album", "imagenportada"],
              include: [{
                model: Artista,
                attributes: ["artista"]
              }]
            }]
          }
        ]
      });
      
      if (!playlist) {
        return res.status(404).json({
          success: false,
          error: {
            code: "PLAYLIST_NOT_FOUND",
            message: "Playlist no encontrada"
          }
        });
      }
      
      const playlistJSON = playlist.toJSON();
      if (playlistJSON.Cancions) {
        playlistJSON.Cancions.sort((a, b) => a.PlaylistCancion.orden - b.PlaylistCancion.orden);
      }
      
      res.json({
        success: true,
        data: playlistJSON
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          code: "DATABASE_ERROR",
          message: "Error al obtener la playlist",
          details: error.message
        }
      });
    }
  },

  create: async (req, res) => {
    try {
      const { playlist, id_usuario } = req.body;
      
      if (!playlist || playlist.trim() === "") {
        return res.status(400).json({
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "El nombre de la playlist es obligatorio"
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
      
      const nuevaPlaylist = await Playlist.create({
        playlist: playlist.trim(),
        id_usuario,
        fecha_creacion: new Date(),
        estado: "activa"
      });
      
      const playlistConRelaciones = await Playlist.findByPk(nuevaPlaylist.id_playlist, {
        include: [
          {
            model: Usuario,
            attributes: ["id_usuario", "usuario", "nyap"]
          }
        ]
      });
      
      res.status(201).json({
        success: true,
        message: "Playlist creada exitosamente",
        data: playlistConRelaciones
      });
      
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          code: "DATABASE_ERROR",
          message: "Error al crear playlist",
          details: error.message
        }
      });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { playlist, estado } = req.body;
      
      const playlistExistente = await Playlist.findByPk(id);
      if (!playlistExistente) {
        return res.status(404).json({
          success: false,
          error: {
            code: "PLAYLIST_NOT_FOUND",
            message: "Playlist no encontrada"
          }
        });
      }
      
      const updateData = {};
      
      if (playlist && playlist.trim() !== "") {
        updateData.playlist = playlist.trim();
      }
      
      if (estado) {
        if (!["activa", "eliminada"].includes(estado)) {
          return res.status(400).json({
            success: false,
            error: {
              code: "VALIDATION_ERROR",
              message: "El estado debe ser 'activa' o 'eliminada'"
            }
          });
        }
        
        updateData.estado = estado;
        
        if (estado === "eliminada" && !playlistExistente.fecha_eliminada) {
          updateData.fecha_eliminada = new Date();
        }
        
        if (estado === "activa" && playlistExistente.fecha_eliminada) {
          updateData.fecha_eliminada = null;
        }
      }
      
      await playlistExistente.update(updateData);
      
      const playlistActualizada = await Playlist.findByPk(id, {
        include: [
          {
            model: Usuario,
            attributes: ["id_usuario", "usuario", "nyap"]
          }
        ]
      });
      
      res.json({
        success: true,
        message: "Playlist actualizada exitosamente",
        data: playlistActualizada
      });
      
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          code: "DATABASE_ERROR",
          message: "Error al actualizar playlist",
          details: error.message
        }
      });
    }
  },

  addCancion: async (req, res) => {
  try {
    const { id } = req.params;
    const { id_cancion, orden } = req.body;
    
    if (!id_cancion) {
      return res.status(400).json({
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message: "El ID de la canción es obligatorio"
        }
      });
    }
    
    const playlist = await Playlist.findByPk(id);
    if (!playlist) {
      return res.status(404).json({
        success: false,
        error: {
          code: "PLAYLIST_NOT_FOUND",
          message: "Playlist no encontrada"
        }
      });
    }
    
    if (playlist.estado === "eliminada") {
      return res.status(400).json({
        success: false,
        error: {
          code: "PLAYLIST_ELIMINADA",
          message: "No se pueden agregar canciones a una playlist eliminada"
        }
      });
    }
    
    const cancion = await Cancion.findByPk(id_cancion);
    if (!cancion) {
      return res.status(404).json({
        success: false,
        error: {
          code: "CANCION_NOT_FOUND",
          message: "Canción no encontrada"
        }
      });
    }
    
    const existeCancion = await PlaylistCancion.findOne({
      where: {
        id_playlist: id,
        id_cancion: id_cancion
      }
    });
    
    if (existeCancion) {
      return res.status(409).json({
        success: false,
        error: {
          code: "CANCION_DUPLICADA",
          message: "La canción ya está en la playlist"
        }
      });
    }
    
    let ordenFinal = orden;
    if (!ordenFinal) {
      const maxOrden = await PlaylistCancion.max("orden", {
        where: { id_playlist: id }
      });
      ordenFinal = (maxOrden || 0) + 1;
    }
    
    const [playlistCancion, created] = await PlaylistCancion.findOrCreate({
      where: {
        id_playlist: id,
        id_cancion: id_cancion
      },
      defaults: {
        orden: ordenFinal,
        fecha_agregada: new Date()
      }
    });

    if (!created) {
      return res.status(409).json({
        success: false,
        error: {
          code: "CANCION_DUPLICADA",
          message: "La canción ya está en la playlist"
        }
      });
    }
    
    res.json({
      success: true,
      message: "Canción agregada a la playlist exitosamente",
      data: {
        playlist: {
          id_playlist: playlist.id_playlist,  
          playlist: playlist.playlist          
        },
        cancion: {
          id_cancion: cancion.id_cancion,      
          cancion: cancion.cancion             
        },
        orden: ordenFinal
      }
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        code: "DATABASE_ERROR",
        message: "Error al agregar canción a la playlist",
        details: error.message
      }
    });
  }
},

  removeCancion: async (req, res) => {
    try {
      const { id, idCancion } = req.params;
      
      const playlist = await Playlist.findByPk(id);
      if (!playlist) {
        return res.status(404).json({
          success: false,
          error: {
            code: "PLAYLIST_NOT_FOUND",
            message: "Playlist no encontrada"
          }
        });
      }
      
      const cancion = await Cancion.findByPk(idCancion);
      if (!cancion) {
        return res.status(404).json({
          success: false,
          error: {
            code: "CANCION_NOT_FOUND",
            message: "Canción no encontrada"
          }
        });
      }
      
      const asociacion = await PlaylistCancion.findOne({
        where: {
          id_playlist: id,
          id_cancion: idCancion
        }
      });
      
      if (!asociacion) {
        return res.status(404).json({
          success: false,
          error: {
            code: "ASOCIACION_NOT_FOUND",
            message: "La canción no está en esta playlist"
          }
        });
      }
      
      await playlist.removeCancion(cancion);
      
      res.json({
        success: true,
        message: "Canción removida de la playlist exitosamente"
      });
      
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          code: "DATABASE_ERROR",
          message: "Error al remover canción de la playlist",
          details: error.message
        }
      });
    }
  }
};

module.exports = playlistsController;