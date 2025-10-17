const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Suscripcion = sequelize.define("suscripcion", {
  id_suscripcion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fecha_inicio: {
    type: DataTypes.DATE,
    allowNull: false
  },
  fecha_renovacion: {
    type: DataTypes.DATE,
    allowNull: true
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_tipo_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: false,
  freezeTableName: true,
  indexes: [
    {
      unique: true,
      fields: ['id_usuario', 'fecha_inicio'] 
    }
  ]
});

module.exports = Suscripcion;