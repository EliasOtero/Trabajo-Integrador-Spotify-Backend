const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const TipoFormaPago = sequelize.define("tipo_forma_pago", {
  id_tipo_forma_pago: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  forma_pago: {
    type: DataTypes.STRING(30)
  }
}, {
  timestamps: false,
  freezeTableName: true
});

module.exports = TipoFormaPago;