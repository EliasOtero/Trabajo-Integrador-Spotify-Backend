/**
 * Configuración principal de la aplicación Express
 * Los estudiantes deben completar la configuración de middlewares y rutas
 */

const express = require("express");
const routes = require("./routes");
const { errorHandler } = require("./middlewares/errorHandler.js");

// TODO: Importar las rutas

const app = express();

// TODO: Configurar parseo de JSON
// Ejemplo: app.use(express.json());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// TODO: Configurar rutas
// Ejemplo: app.use('/api/v1/usuarios', usuariosRoutes);
app.use("/api/v1", routes);

app.get('/', (req, res) => res.send("🎧 API Spotify Backend funcionando! proba la ruta http://localhost:3000/api/v1/"));


// TODO: Configurar ruta 404
app.use("/", (req, res) => 
    {
        res.status(404).json
        (
            {
                success: false,
                error: 
                {
                    code: 404,
                    message: "Ruta no encontrada",
                    path: req.originalUrl
                }
            }
        );
    });


// TODO: Configurar middleware de manejo de errores (debe ir al final)
app.use(errorHandler)


module.exports = app;
