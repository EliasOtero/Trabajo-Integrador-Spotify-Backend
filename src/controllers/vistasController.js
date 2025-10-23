const sequelize = require("../config/database");

class VistasController {
  static async cancionesPopularesPorPais(req, res) {
    try {
      const { pais, limit } = req.query;

      let query = `
        SELECT
          c.cancion AS nombre_cancion,
          ar.artista AS nombre_artista,
          alb.album AS nombre_album,
          p.pais AS nombre_pais,
          SUM(c.reproducciones) AS total_reproducciones,
          COUNT(DISTINCT pc.id_playlist) AS apariciones_en_playlists
        FROM cancion c
        INNER JOIN album alb ON c.id_album = alb.id_album
        INNER JOIN artista ar ON alb.id_artista = ar.id_artista
        INNER JOIN playlist_cancion pc ON c.id_cancion = pc.id_cancion
        INNER JOIN playlist pl ON pc.id_playlist = pl.id_playlist
        INNER JOIN usuario u ON pl.id_usuario = u.id_usuario
        INNER JOIN pais p ON u.id_pais = p.id_pais
        WHERE pl.estado = "activa"
      `;

      if (pais) {
        query += ` AND p.pais = :pais `;
      }
      query += ` GROUP BY p.id_pais, c.id_cancion `;
      query += ` ORDER BY p.pais, total_reproducciones DESC `;

      const [resultados] = await sequelize.query(query, {
        replacements: { pais }, 
      });

      const dataFinal = limit ? resultados.slice(0, parseInt(limit)) : resultados;

      res.json({
        success: true,
        count: dataFinal.length,
        data: dataFinal,
        message: `Resultados obtenidos correctamente (${dataFinal.length} registros)`,
      });

    } catch (error) {
      console.error("Error en cancionesPopularesPorPais:", error);
      res.status(500).json({
        success: false,
        error: {
          code: "DATABASE_ERROR",
          message: "Error al obtener canciones populares por país",
          details: error.message,
        },
      });
    }
  }
}

module.exports = VistasController;
