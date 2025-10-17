const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");


const Usuario = sequelize.define("usuario", {
  id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  usuario: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: "usuario_temp"
  },
  nyap: {
    type: DataTypes.STRING(150),
    allowNull: false,
    defaultValue: "Nombre Temporal"
  },
  fecha_nac: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: "2000-01-01"
  },
  sexo: {
    type: DataTypes.CHAR(1),
    allowNull: false,
    defaultValue: "O"
  },
  cp: {
    type: DataTypes.STRING(10),
    allowNull: true
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true  
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  fecha_mod_password: {
    type: DataTypes.DATE,
    allowNull: true
  },
  id_pais: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  id_tipo_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 3
  }
}, {
  timestamps: false,
  freezeTableName: true
});

module.exports = Usuario;
