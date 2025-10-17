const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const PlaylistCancion = sequelize.define("playlist_cancion", {
  id_playlist: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  id_cancion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  orden: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fecha_agregada: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: false,
  freezeTableName: true
});

module.exports = PlaylistCancion;