const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const TipoUsuario = sequelize.define("tipo_usuario", {
  id_tipo_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  tipoUsuario: {
    type: DataTypes.STRING(20)
  }
}, {
  timestamps: false,
  freezeTableName: true
});

module.exports = TipoUsuario;