const sequelize = require("../config/database");


// Importar todos los modelos
const Usuario = require("./Usuario");
const Pais = require("./Pais");
const TipoUsuario = require("./TipoUsuario");
const Artista = require("./Artista");
const Discografica = require("./Discografica");
const Genero = require("./Genero");
const Album = require("./Album");
const Cancion = require("./Cancion");
const Playlist = require("./Playlist");
const PlaylistCancion = require("./PlaylistCancion");
const CancionGenero = require("./CancionGenero");
const Suscripcion = require("./Suscripcion");
const TipoFormaPago = require("./TipoFormaPago");
const DatosPagoUsuario = require("./metodos-pago");
const Pagos = require("./Pago");

// Configurar relaciones
const setupAssociations = () => {
  // Relaciones de Usuario
  Usuario.belongsTo(Pais, { foreignKey: "id_pais" });
  Usuario.belongsTo(TipoUsuario, { foreignKey: "id_tipo_usuario" });
  Usuario.hasMany(Playlist, { foreignKey: "id_usuario" });
  Usuario.hasMany(Suscripcion, { foreignKey: "id_usuario" });
  Usuario.hasMany(DatosPagoUsuario, { foreignKey: "id_usuario" });
  Usuario.hasMany(Pagos, { foreignKey: "id_usuario" });

  // Relaciones de playlist
  Playlist.belongsTo(Usuario, { foreignKey: "id_usuario" });

  // Relaciones de Artista y Album
  Artista.hasMany(Album, { foreignKey: "id_artista" });
  Album.belongsTo(Artista, { foreignKey: "id_artista" });
  Album.belongsTo(Discografica, { foreignKey: "id_discografica" });
  Discografica.hasMany(Album, { foreignKey: "id_discografica" });
  Discografica.belongsTo(Pais, { foreignKey: "id_pais" });

  // Relaciones de Cancion
  Album.hasMany(Cancion, { foreignKey: "id_album" });
  Cancion.belongsTo(Album, { foreignKey: "id_album" });

  // Relaciones N:M
  Playlist.belongsToMany(Cancion, { 
    through: PlaylistCancion,
    foreignKey: "id_playlist",
    otherKey: "id_cancion"
  });
  Cancion.belongsToMany(Playlist, { 
    through: PlaylistCancion,
    foreignKey: "id_cancion",
    otherKey: "id_playlist"
  });

  Cancion.belongsToMany(Genero, { 
    through: CancionGenero,
    foreignKey: "id_cancion",
    otherKey: "id_genero"
  });
  Genero.belongsToMany(Cancion, { 
    through: CancionGenero,
    foreignKey: "id_genero",
    otherKey: "id_cancion"
  });

  // Relaciones de Suscripcion
  Suscripcion.belongsTo(Usuario, { foreignKey: "id_usuario" });
  Suscripcion.belongsTo(TipoUsuario, { foreignKey: "id_tipo_usuario" });

  // Relaciones de Pagos
  Pagos.belongsTo(Usuario, { foreignKey: "id_usuario" });
  Pagos.belongsTo(Suscripcion, { foreignKey: "id_suscripcion" });
  Pagos.belongsTo(DatosPagoUsuario, { foreignKey: "id_datos_pago" });
  Pagos.belongsTo(TipoFormaPago, { foreignKey: "id_tipo_forma_pago" });

  // Relaciones de DatosPagoUsuario
  DatosPagoUsuario.belongsTo(Usuario, { foreignKey: "id_usuario" });
  DatosPagoUsuario.belongsTo(TipoFormaPago, { foreignKey: "id_tipo_forma_pago" });
};

module.exports = {
  sequelize,
  setupAssociations,
  Usuario,
  Pais,
  TipoUsuario,
  Artista,
  Discografica,
  Genero,
  Album,
  Cancion,
  Playlist,
  PlaylistCancion,
  CancionGenero,
  Suscripcion,
  TipoFormaPago,
  DatosPagoUsuario,
  Pagos
};