const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const CancionGenero = sequelize.define("cancion_genero", {
  id_cancion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  id_genero: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  }
}, {
  timestamps: false,
  freezeTableName: true
});

module.exports = CancionGenero;