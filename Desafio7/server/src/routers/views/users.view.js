import { Router } from "express";

const usersRouter = Router();

// ruta de vista de registro
usersRouter.get("/register", (req, res, next) => {
  try {
    return res.render("register", { title: "REGISTRO" });
  } catch (error) {
    next(error);
  }
});

// rutsa de vista de inicio de session
usersRouter.get("/login", (req, res, next) => {
  try {
    return res.render("login");
  } catch (error) {
    next(error);
  }
});
export default usersRouter;
