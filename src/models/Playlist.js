const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Playlist = sequelize.define("playlist", {
  id_playlist: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  playlist: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  estado: {
    type: DataTypes.ENUM('activa', 'eliminada'),
    defaultValue: 'activa'
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    allowNull: true
  },
  fecha_eliminada: {
    type: DataTypes.DATE,
    allowNull: true
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: false,
  freezeTableName: true
});

module.exports = Playlist;