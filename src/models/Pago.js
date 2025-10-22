const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Pagos = sequelize.define("pagos", {
  id_pagos: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fechaPago: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  importe: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_suscripcion: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  id_datos_pago: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  id_tipo_forma_pago: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: false,
  freezeTableName: true
});

module.exports = Pagos;