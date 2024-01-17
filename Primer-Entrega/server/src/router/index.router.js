// sitaccis de todo enrutador principal
import { Router } from "express";
import apiRouter from "./api/index.router.js"; // enrutador de la api

const router = Router();

router.use("/api", apiRouter);

export default router;
