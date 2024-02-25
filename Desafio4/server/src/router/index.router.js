// sitaccis de todo enrutador principal
import { Router } from "express";
import apiRouter from "./api/index.router.js"; // enrutador de la api
import viewsRouter from "./views/index.view.js";
import productsRouter from "./views/products.views.js";
import MostrarUsuario from "./views/users.view.js";

const router = Router();

<<<<<<< HEAD
// van todas las rutas para la vista
// router.use("/api", apiRouter);
=======
router.use("/api", apiRouter);
>>>>>>> 34e14413fe6bb275abfed6ea28d55270d119d948
router.use("/", viewsRouter);
router.use("/products", productsRouter);
router.use("/register", MostrarUsuario);

export default router;
