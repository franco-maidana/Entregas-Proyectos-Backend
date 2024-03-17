import { Router } from "express";
import usersRouter from "./user.router.api.js";
import productsRouter from "./products.router.api.js";
import OrdersRouter from "./orders.router.api.js";
// import cookiesRouter from "./cookies.router.api.js"; => es solo de ejemplo
import sessionsRouter from "./sessions.router.api.js";

const apiRouter = Router();

apiRouter.use("/users", usersRouter);
apiRouter.use("/products", productsRouter);
apiRouter.use("/orders", OrdersRouter);
// apiRouter.use("/cookies", cookiesRouter); => es solo de ejemplo 
apiRouter.use("/session", sessionsRouter);

export default apiRouter;
