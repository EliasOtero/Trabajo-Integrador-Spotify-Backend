const express = require("express");
const routes = require("./routes");
const { errorHandler } = require("./middlewares/errorHandler");
const { sequelize } = require("./models");
const models = require("./models");

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


(async () => {
  try {
    models.setupAssociations();
    console.log("Relaciones configuradas");

    await sequelize.sync({ alter: false });
    console.log("Conexión y sincronización con MySQL establecida correctamente");
  } catch (error) {
    console.error("Error al conectar o sincronizar con la base de datos:", error);
  }
})();


app.use("/api/v1", routes);


app.get("/", (req, res) => {
  res.send("API Spotify Backend funcionando! Prueba la ruta /api/v1/");
});


app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 404,
      message: "Ruta no encontrada",
      path: req.originalUrl,
    },
  });
});


app.use(errorHandler);

module.exports = app;
