/* const sequelize = require("../config/database");

class VistasController2 {
  static async ingresosPorArtistaDiscografica(req, res) {
    try {
      const { pais, minimo_ingresos, orden } = req.query;

      // Construir condiciones dinámicas
      const replacements = {};
      let whereClause = 'WHERE s.fecha_renovacion > NOW()';
      let havingClause = '';
      
      if (pais) {
        whereClause += ' AND p.pais = :pais';
        replacements.pais = pais;
      }
      
      if (minimo_ingresos) {
        havingClause = 'HAVING SUM(pa.importe) >= :minimo_ingresos';
        replacements.minimo_ingresos = parseFloat(minimo_ingresos);
      }

      // Determinar ordenamiento
      let orderBy = 'total_ingresos DESC';
      if (orden === 'suscripciones') {
        orderBy = 'cantidad_suscripciones_activas DESC';
      } else if (orden === 'canciones') {
        orderBy = 'total_canciones DESC';
      } else if (orden === 'reproducciones') {
        orderBy = 'promedio_reproducciones DESC';
      }

      const query = `
        SELECT
          ar.artista AS nombre_artista,
          d.discografica AS nombre_discografica,
          p.pais AS nombre_pais_discografica,
          SUM(pa.importe) AS total_ingresos,
          COUNT(DISTINCT s.id_suscripcion) AS cantidad_suscripciones_activas,
          COUNT(DISTINCT c.id_cancion) AS total_canciones,
          ROUND(AVG(c.reproducciones), 2) AS promedio_reproducciones
        FROM pagos pa
        INNER JOIN suscripcion s ON pa.id_suscripcion = s.id_suscripcion
        INNER JOIN usuario u ON s.id_usuario = u.id_usuario
        -- RELACIÓN CORREGIDA: usuario -> playlist -> canciones -> album -> artista/discografica
        INNER JOIN playlist pl ON u.id_usuario = pl.id_usuario AND pl.estado = 'activa'
        INNER JOIN playlist_cancion pc ON pl.id_playlist = pc.id_playlist
        INNER JOIN cancion c ON pc.id_cancion = c.id_cancion
        INNER JOIN album al ON c.id_album = al.id_album
        INNER JOIN artista ar ON al.id_artista = ar.id_artista
        INNER JOIN discografica d ON al.id_discografica = d.id_discografica
        INNER JOIN pais p ON d.id_pais = p.id_pais
        ${whereClause}
        GROUP BY ar.id_artista, ar.artista, d.id_discografica, d.discografica, p.id_pais, p.pais
        ${havingClause}
        ORDER BY ${orderBy}
      `;

      const [resultados] = await sequelize.query(query, {
        replacements: replacements,
      });

      res.json({
        success: true,
        count: resultados.length,
        data: resultados,
        filters: {
          pais: pais || null,
          minimo_ingresos: minimo_ingresos || null,
          orden: orden || 'ingresos'
        },
        message: `Ingresos por artista y discográfica obtenidos correctamente (${resultados.length} registros)`,
      });
    } catch (error) {
      console.error("Error en ingresosPorArtistaDiscografica:", error);
      res.status(500).json({
        success: false,
        error: {
          code: "DATABASE_ERROR",
          message: "Error al obtener ingresos por artista y discográfica",
          details: error.message,
        },
      });
    }
  }
}

module.exports = VistasController2; */


///NO FUNCIONA/ NO SE COMO 