import { Router } from "express";
import Usuarios from "../../data/fs/users.fs.js";

const MostrarUsuario = Router();

MostrarUsuario.get("/", async (req, res, next) => {
  try {
    const userId = "039bf58b7290494fe83e6474";
    const user = await Usuarios.readOne(userId);
    console.log(user);
    return res.render("register", { users: user });
  } catch (error) {
    next(error);
  }
});

export default MostrarUsuario;
