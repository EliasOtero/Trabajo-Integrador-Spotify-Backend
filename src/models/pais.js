const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Pais = sequelize.define("pais", {
  id_pais: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  pais: {
    type: DataTypes.STRING(60),
    unique: true
  }
}, {
  timestamps: false,
  freezeTableName: true
});

module.exports = Pais;