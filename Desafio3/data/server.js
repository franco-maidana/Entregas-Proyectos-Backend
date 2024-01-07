import express, { response } from "express";
import usuarios from "./fs/files/users.fs.js";
import productos from "./fs/files/product.fs.js";

const server = express();

const PORT = 8080;
const ready = () => console.log("server ready on port" + PORT);

server.listen(PORT, ready);

// MIDDLEWARE

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// USUARIOS
// READ()
server.get("/api/users", async (req, res) => {
  try {
    console.log("Entró aquí");
    const all = usuarios.read(); // Obtener los usuarios

    if (all.length === 0) {
      // throw new Error("Not found Users");
      return res.json({
        statusCode: 404,
        message: "Not found Users",
      });
    }

    console.log(all);

    return res.json({
      statusCode: 200,
      response: all, // Enviar los usuarios obtenidos como respuesta
    });
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

// READONE(ID)
server.get("/api/users/:uid", async (req, res) => {
  try {
    const uid = req.params;
    const elUsuario = await usuarios.readOne(uid);
    if (!elUsuario) {
      return res.json({
        statusCode: 404,
        message: "User not Found",
      });
    }
    console.log(elUsuario);
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

// PRODUCTOS
// READ
server.get("/api/produts", async (req, res) => {
  try {
    const all = productos.read();
    if (all.length === 0) {
      return res.json({
        statusCode: 404,
        message: "Not found Users",
      });
    }

    console.log(all);

    return res.json({
      statusCode: 200,
      response: all, // Enviar los productos obtenidos como respuesta
    });
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

// READONE(id)
server.get("/api/produts/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const elProducto = await productos.readOne(pid);
    if (!elProducto) {
      return res.json({
        statusCode: 404,
        message: "produts not found",
      });
    } else {
      return res.json({
        statusCode: 404,
        response: elProducto,
      });
    }
    console.log(elProducto);
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});
