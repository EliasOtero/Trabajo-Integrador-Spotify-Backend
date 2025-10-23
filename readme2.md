# 🎧 API REST - Plataforma Musical (Trabajo Integrador Spotify Backend)

> Proyecto integrador desarrollado con **Node.js**, **Express**, **Sequelize** y **MySQL**.  
> Simula una API tipo Spotify para gestionar usuarios, artistas, álbumes, canciones y playlists.

---

## 🔧 Tecnologías y Dependencias

Esta API se construyó utilizando:

- **Node.js** + **Express.js**: servidor y framework de backend.  
- **MySQL2**: cliente MySQL moderno para Node.js.  
- **Sequelize**: ORM para gestionar modelos y relaciones con la base de datos.  
- **bcrypt**: para hashear y proteger contraseñas de usuarios.  
- **dotenv**: gestión de variables de entorno (.env).  
- **pnpm**: gestor de paquetes rápido y eficiente.

## 👞 PASOS PARA PROBAR LA API

### Instalar dependencias
pnpm install

### Configurar variables de entorno
Editar .env con tus datos de MySQL

### Iniciar servidor
pnpm run dev
Servidor disponible en http://localhost:3000

##  📁 Estructura del Proyecto
src/
├─ config/       # Configuración DB y variables
├─ controllers/  # Modelos de datos (consultas SQL / Sequelize)
├─ data/         # Datos de prueba
├─ docs/         # Ubicacion del archivo DER
├─ middlewares/  # Datos de prueba
├─ models/       # Lógica de las tablas
├─ routes/       # Endpoints Express
├─ SQL/          # Ubicacion de los archivos SQL de la base de datos 
├─ app.js        # Configuración Express
.gitignore
api.http
env.example 
mi api.http      # API ENDPOINTS
package.json
pnpm-lock.yaml
readme.md        # Documentacion original
readme2.md       # Mi documentacion (Este archivo)
server.js        # Entrada principal

## Endpoints principales

USUARIOS
| Método | Endpoint                           | Descripción                                 |
| ------ | ---------------------------------- | ------------------------------------------- |
| GET    | /api/v1/usuarios                   | Lista todos los usuarios                    |
| GET    | /api/v1/usuarios/:id               | Detalle de usuario                          |
| POST   | /api/v1/usuarios                   | Crear usuario (email único, hash password)  |
| PUT    | /api/v1/usuarios/:id               | Actualizar usuario (puede cambiar password) |
| DELETE | /api/v1/usuarios/:id               | Baja de usuario (soft delete o force=true)  |
| GET    | /api/v1/usuarios/password-vencidas | Lista usuarios con password > 90 días       |

ARTISTAS
| Método | Endpoint             | Descripción                              |
| ------ | -------------------- | ---------------------------------------- |
| GET    | /api/v1/artistas     | Lista todos los artistas                 |
| GET    | /api/v1/artistas/:id | Detalle de artista                       |
| POST   | /api/v1/artistas     | Crear artista (nombre único obligatorio) |

PAISES
| Método | Endpoint           | Descripción                             |
| ------ | ------------------ | --------------------------------------- |
| GET    | /api/v1/paises     | Lista todos los países (con paginación) |
| GET    | /api/v1/paises/:id | Detalle de país                         |
| POST   | /api/v1/paises     | Crear país (nombre único obligatorio)   |

DISCOGRAFICAS
| Método | Endpoint                           | Descripción                                            |
| ------ | ---------------------------------- | ------------------------------------------------------ |
| GET    | /api/v1/discograficas              | Lista todas las discográficas (con paginación)         |
| GET    | /api/v1/discograficas/:id          | Detalle de discográfica                                |
| GET    | /api/v1/discograficas/pais/:idPais | Lista discográficas de un país                         |
| POST   | /api/v1/discograficas              | Crear discográfica (nombre único por país obligatorio) |

ALBUMES
| Método | Endpoint                      | Descripción                                           |
| ------ | ----------------------------- | ----------------------------------------------------- |
| GET    | /api/v1/albumes               | Lista todos los álbumes (filtros: `artistaId`, `q`)   |
| GET    | /api/v1/albumes/:id           | Detalle de un álbum                                   |
| GET    | /api/v1/albumes/:id/canciones | Listado de canciones de un álbum                      |
| POST   | /api/v1/albumes               | Crear álbum (requiere artista y discográfica válidos) |

CANCIONES
| Método | Endpoint                                | Descripción                        |
| ------ | --------------------------------------- | ---------------------------------- |
| GET    | /api/v1/canciones                       | Lista todas las canciones          |
| GET    | /api/v1/canciones/:id                   | Detalle de canción                 |
| POST   | /api/v1/canciones                       | Crear canción                      |
| PUT    | /api/v1/canciones/:id                   | Actualizar canción                 |
| POST   | /api/v1/canciones/:id/generos           | Asociar un género a la canción     |
| DELETE | /api/v1/canciones/:id/generos/:idGenero | Desasociar un género de la canción |

GENEROS
| Método | Endpoint        | Descripción             |
| ------ | --------------- | ----------------------- |
| GET    | /api/v1/generos | Lista todos los géneros |
| POST   | /api/v1/generos | Crear un nuevo género   |

PLAYLISTS
| Método | Endpoint                                   | Descripción                                |
| ------ | ------------------------------------------ | ------------------------------------------ |
| GET    | /api/v1/playlists                          | Lista todas las playlists                  |
| GET    | /api/v1/playlists/:id                      | Obtiene una playlist por ID                |
| POST   | /api/v1/playlists                          | Crea una nueva playlist                    |
| PUT    | /api/v1/playlists/:id                      | Actualiza una playlist                     |
| POST   | /api/v1/playlists/:id/canciones            | Agrega una canción a la playlist           |
| DELETE | /api/v1/playlists/:id/canciones/:idCancion | Remueve una canción de la playlist         |

SUSCRIPCIONES
| Método | Endpoint                         | Descripción                             |
| ------ | -------------------------------- | --------------------------------------- |
| GET    | /api/v1/suscripciones            | Lista todas las suscripciones           |
| GET    | /api/v1/suscripciones/:id        | Obtiene una suscripción por ID          |
| POST   | /api/v1/suscripciones            | Crea una nueva suscripción              |
| PUT    | /api/v1/suscripciones/:id        | Actualiza una suscripción               |

METODOS DE PAGO
| Método | Endpoint                         | Descripción                                  |
| ------ | -------------------------------- | -------------------------------------------- |
| GET    | /api/v1/metodos-pago?usuarioId=  | Lista los métodos de pago de un usuario      |
| POST   | /api/v1/metodos-pago             | Crea un nuevo método de pago para un usuario |

PAGOS
| Método | Endpoint                    | Descripción                                                     |
| ------ | --------------------------  | --------------------------------------------------------------- |
| GET    | /api/v1/pagos               | Lista todos los pagos, filtrables por usuario y rango de fechas |
| GET    | /api/v1/pagos/:id           | Obtiene un pago específico por su ID                            |
| POST   | /api/v1/pagos               | Registra un nuevo pago para un usuario y su suscripción         |

VISTAS
| Método | Endpoint                            | Descripción                                             |
| ------ | ----------------------------------- | ------------------------------------------------------- |
| GET    | /api/v1/vistas/canciones-populares  | Devuelve las canciones más populares agrupadas por país |

## ✅ Validaciones y reglas importantes
Email único en usuarios
Duración de canciones en segundos (INT > 0)
UNIQUE(id_artista, titulo) en álbumes
Soft delete en playlists: si estado=eliminada → fecha_eliminada NOT NULL
Métodos de pago: almacenar solo últimos 4 dígitos, sin CVC
Suscripciones: fecha_renovacion > fecha_inicio, UNIQUE(id_usuario, fecha_inicio)
Hasheo de passwords con bcrypt

## 🧪 Pruebas
Usar  mi api.http para probar todos los endpoints, incluyendo casos negativos.

## 📊 DER y documentación técnica
DER exportado en /docs/DER.png
SQL exportado en /SQL/spotify.sql


## 📄 Autor
Trabajo Integrador Backend – 2025
Desarrollado por Elias Otero

