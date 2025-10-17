const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Cancion = sequelize.define("cancion", {
  id_cancion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  cancion: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  duracion_seg: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  reproducciones: {
    type: DataTypes.BIGINT,
    defaultValue: 0
  },
  likes: {
    type: DataTypes.BIGINT,
    defaultValue: 0
  },
  fecha_agregada: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  id_album: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  timestamps: false,
  freezeTableName: true
});

module.exports = Cancion;