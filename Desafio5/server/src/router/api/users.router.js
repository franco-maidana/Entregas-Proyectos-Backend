import { Router } from "express";
// import Usuarios from "../../data/fs/users.fs.js";
import { Usuarios } from "../../data/mongo/manager.model.js";

const usersRouter = Router();

usersRouter.post("/api/users", async (req, res) => {
  try {
    const userData = req.body; // Se obtienen los datos del cuerpo de la solicitud POST
    const nuevoUsuario = await Usuarios.create(userData); // Se crea un nuevo usuario utilizando los datos proporcionados
    console.log(nuevoUsuario);
    return res.status(201).json({
      statusCode: 201,
      response: nuevoUsuario,
      message: `Usuario creado exitosamente`,
    }); // Se devuelve una respuesta JSON con el código de estado 201 y un mensaje de éxito
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      statusCode: 500,
      message: error.message,
    }); // En caso de error, se devuelve una respuesta JSON con el código de estado 500 y un mensaje de error
  }
});

usersRouter.get("/api/users", async (req, res) => {
  try {
    let filter = {};
    let order = {};

    if (req.query.user_id) {
      filter = { user_id: req.query.user_id };
    }

    if (req.query.order) {
      const [field, sortOrder] = req.query.order.split(":");
      if (field && sortOrder) {
        order[field] = sortOrder.toLowerCase() === "asc" ? 1 : -1;
      }
    }
    console.log("Entró aquí");
    const all = await Usuarios.read({ filter, order });
    return res.json({
      statusCode: 200,
      response: all,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

usersRouter.get("/api/users/:uid", async (req, res) => {
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
      response: error.message,
      message: "Error al obtener el usuario",
    });
  }
});

usersRouter.put("/api/users/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const data = req.body;
    const one = await Usuarios.update(uid, data);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return res.json({
      statusCode: 500,
      response: error.message,
      message: "Error al obtener el usuario",
    });
  }
});

usersRouter.delete("/api/users/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const one = await Usuarios.destroy(uid);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return res.json({
      statusCode: 500,
      response: error.message,
      message: "Error al obtener el usuario",
    });
  }
});

usersRouter.get("/api/users/email", async (req, res) => {
  try {
    const { email } = req.query; // Cambiado de mail a email
    const usuarioEncontrado = await Usuarios.readByEmail(email);

    return res.status(200).json({
      statusCode: 200,
      response: usuarioEncontrado,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      response: error.message,
      message: "Error al obtener el usuario",
    });
  }
});

export default usersRouter;
