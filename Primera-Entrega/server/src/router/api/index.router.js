import { Router } from "express";
import eventsRouter from "./products.roueter.js";
import userRouter from "./users.router.js";

// enrutador principal de la API
const apiRouter = Router();

// definir los enrutadores de los recursos
apiRouter.use("/users", userRouter);
apiRouter.use("/events", eventsRouter);

export default apiRouter;
