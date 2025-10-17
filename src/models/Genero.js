const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Genero = sequelize.define("genero", {
  id_genero: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  genero: {
    type: DataTypes.STRING(50),
    unique: true
  }
}, {
  timestamps: false,
  freezeTableName: true
});

module.exports = Genero;