import { Router } from "express";
import Usuarios from "../../data/fs/users.fs.js";

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

export default usersRouter;
