/**
 * Configuración de conexión a la base de datos MySQL
 * Los estudiantes deben completar la configuración de la conexión
 */

const { Sequelize } = require ("sequelize");
require("dotenv").config();
const {DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT} = process.env;

const sequelize = new Sequelize
(
  DB_NAME, DB_USER, DB_PASSWORD, 
  {
    host: DB_HOST,
    port: DB_PORT || 3306,
    dialect: "mysql",
  }
)


