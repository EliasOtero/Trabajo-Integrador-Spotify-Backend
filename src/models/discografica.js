const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Discografica = sequelize.define("discografica", {
  id_discografica: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  discografica: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  id_pais: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: false,
  freezeTableName: true,
  indexes: [
    {
      unique: true,
      fields: ['discografica', 'id_pais'] 
    }
  ]
});

module.exports = Discografica;