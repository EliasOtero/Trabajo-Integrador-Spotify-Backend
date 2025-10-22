require("dotenv").config();
const app = require("./src/app");
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => 
    {
        console.log("Servidor Spotify andando!");
        console.log(`Escuchando en http://localhost:${PORT}`);
        console.log(`Modo: ${process.env.NODE_ENV || "development"}`);
    });

server.on('error', (err) => 
    {
        console.error("Error al iniciar el servidor:", err.message);
        process.exit(1);
    });