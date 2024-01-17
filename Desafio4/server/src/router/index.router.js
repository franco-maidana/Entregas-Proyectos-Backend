// sitaccis de todo enrutador principal
import { Router } from "express";
import apiRouter from "./api/index.router.js"; // enrutador de la api
import viewsRouter from "./views/index.view.js";
import productsRouter from "./views/products.views.js";
import MostrarUsuario from "./views/users.view.js";

const router = Router();

router.use("/api", apiRouter);
router.use("/", viewsRouter);
router.use("/products", productsRouter);
router.use("/register", MostrarUsuario);

export default router;