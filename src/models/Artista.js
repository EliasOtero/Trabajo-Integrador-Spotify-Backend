const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Artista = sequelize.define("artista", {
  id_artista: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  artista: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  imagen: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  timestamps: false,
  freezeTableName: true
});

module.exports = Artista;