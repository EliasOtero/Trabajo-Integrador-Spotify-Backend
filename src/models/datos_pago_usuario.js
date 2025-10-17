const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const DatosPagoUsuario = sequelize.define("datos_pago_usuario", {
  id_datos_pago: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  cbu: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  banco_codigo: {
    type: DataTypes.SMALLINT,
    allowNull: true
  },
  nro_tarjeta_masc: {
    type: DataTypes.STRING(4),
    allowNull: true
  },
  mes_caduca: {
    type: DataTypes.TINYINT,
    allowNull: true
  },
  anio_caduca: {
    type: DataTypes.SMALLINT,
    allowNull: true
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_tipo_forma_pago: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: false,
  freezeTableName: true
});

module.exports = DatosPagoUsuario;