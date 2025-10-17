const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Album = sequelize.define("album", {
  id_album: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  album: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  imagenportada: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  anio_publicacion: {
    type: DataTypes.INTEGER, 
    allowNull: true
  },
  id_artista: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_discografica: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: false,
  freezeTableName: true,
  indexes: [
    {
      unique: true,
      fields: ['id_artista', 'album'] 
    }
  ]
});

module.exports = Album;