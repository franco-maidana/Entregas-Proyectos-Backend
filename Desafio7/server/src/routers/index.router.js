import { Router } from "express";
import apiRouter from "./api/index.router.api.js";
import viewsRouter from "./views/index.router.view.js";

const router = Router();

router.use("/api", apiRouter); // => apis
router.use("/", viewsRouter); //=> vistas

export default router;
