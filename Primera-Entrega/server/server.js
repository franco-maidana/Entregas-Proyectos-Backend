import express, { response } from "express";
import productos from "./src/data/fs/product.fs.js";
import Usuarios from "./src/data/fs/users.fs.js";
import ordenManager from "./src/data/fs/ordersManager.fs.js";
import router from "./src/router/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandleer.mid.js";
import __dirname from "./utils.js";

const server = express();

const PORT = 8080;
const ready = () => console.log("server ready on port" + PORT);

server.listen(PORT, ready);

// endpoind
// USUARIOS => YA TENEMOS LOS TRES QUE HACEN FALTA
server.post("/api/users", async (req, res) => {
  try {
    const userData = req.body;
    const nuevoUsuario = await Usuarios.create(userData);

    return res.status(201).json({
      statusCode: 201,
      message: `Usuario ${nuevoUsuario} creado exitosamente`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      statusCode: 500,
      message: error.message,
    });
  }
}); // => verlo con el profe

server.get("/api/users", async (req, res) => {
  try {
    console.log("Entró aquí");
    const all = Usuarios.read(); // Obtener los usuarios

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

server.get("/api/users/:uid", async (req, res) => {
  try {
    const userId = req.params.uid;
    const elUsuario = await Usuarios.readOne(userId);
    if (!elUsuario) {
      return res.json({
        statusCode: 404,
        message: "Usuario no encontrado",
      });
    }
    console.log(elUsuario);
    return res.json(elUsuario); // Devolver solo el producto encontrado
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

// PRODUCTS  => falta metodo PUT POST

server.post("/api/products", async (req, res) => {
  try {
    const productData = req.body;

    const createdProduct = await productos.create(productData);
    console.log(createdProduct);
    return res.status(201).json({
      statusCode: 201,
      message: "Producto creado exitosamente",
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: error.message || "Ha ocurrido un error al crear el producto",
    });
  }
});

// READ
server.get("/api/products", async (req, res) => {
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
server.get("/api/products/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const elProducto = await productos.readOne(pid);

    if (!elProducto) {
      return res.status(404).json({
        statusCode: 404,
        message: "Product not found",
      });
    } else {
      console.log(elProducto); // Mueve la impresión antes de enviar la respuesta
      return res.status(200).json({
        statusCode: 200,
        response: elProducto,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      statusCode: 500,
      message: error.message,
    });
  }
});

// DESTROY(id)
server.delete("/api/products/:pid", async (req, res) => {
  try {
    const { pid } = req.params;

    // Llama al método destroy de ProductManager con el ID proporcionado
    const deletedProduct = await productos.destroy(pid);

    // Si se elimina con éxito, devuelve un mensaje apropiado
    return res.status(200).json({
      statusCode: 200,
      message: `Producto con ID ${pid} eliminado correctamente`,
    });
  } catch (error) {
    // Si hay algún error, devuelve un mensaje de error
    return res.status(500).json({
      statusCode: 500,
      message: error.message || "Ha ocurrido un error al eliminar el producto",
    });
  }
});

server.put("/api/products/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const productData = req.body;

    // Llama al método update de ProductManager con el ID y los datos proporcionados
    const updatedProduct = await productos.update(pid, productData);

    // Si se actualiza con éxito, devuelve el producto actualizado
    return res.status(200).json({
      statusCode: 200,
      message: `Producto con ID ${pid} actualizado correctamente`,
      product: updatedProduct,
    });
  } catch (error) {
    // Si hay algún error, devuelve un mensaje de error
    return res.status(500).json({
      statusCode: 500,
      message:
        error.message || "Ha ocurrido un error al actualizar el producto",
    });
  }
});

// ORDERSMANAGER

server.post("/api/orders", async (req, res) => {
  try {
    const productData = req.body;

    const createdProduct = await ordenManager.create(productData);
    console.log(createdProduct);
    return res.status(201).json({
      statusCode: 201,
      message: "Producto creado exitosamente",
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: error.message || "Ha ocurrido un error al crear el producto",
    });
  }
});

server.get("/api/orders/:uid", async (req, res) => {
  try {
    // Obtener el uid de la URL
    const { uid } = req.params;
    const userOrders = ordenManager.readByUser(uid); // Pasar el uid a la función

    console.log(userOrders);

    if (userOrders.length === 0) {
      return res.json({
        statusCode: 404,
        message: "Not found Orders for this User",
      });
    }

    return res.json({
      statusCode: 200,
      response: userOrders,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      statusCode: 500,
      message: error.message,
    });
  }
});

server.use(express.static(__dirname + "/public"));
// estos tres tienen que ir ultimos
server.use("/", router);
server.use(errorHandler); // Middlewares/errorHandler.mid.js
server.use(pathHandler); // Middlewares/pathsHandler.mid.js
