import { Router } from "express";
import productsRouter from "./products.view.js";
import usersRouter from "./users.view.js";
import ordenRouter from "./orders.router.view.js";
import { productos } from "../../data/mongo/manager.model.js";

const viewsRouter = Router();

// pagina principal de inicio
viewsRouter.get("/", async (req, res, next) => {
  try {
    let filter = {};
    let orderAndPaginate = { lean: true };
    if (req.query.user_id) {
      filter = { user_id: req.query.user_id };
    }
    if (req.query.order) {
      const [field, sortOrder] = req.query.order.split(":");
      if (field && sortOrder) {
        orderAndPaginate[field] = sortOrder.toLowerCase() === "asc" ? 1 : -1;
      }
    }
    const products = await productos.read({ filter, orderAndPaginate });
    const date = new Date();
    return res.render("index", { products: products, date });
  } catch (error) {
    return next(error);
  }
});

// todas las vistas de productos van a funcionar agregando products primero en la ruta
viewsRouter.use("/products", productsRouter);
// todas las vistas de usuarios van a funcionar agregando users primero en la ruta
viewsRouter.use("/users", usersRouter);
// todas las vistas de usuarios van a funcionar agregando orders primero en la ruta
viewsRouter.use("/orders", ordenRouter);

export default viewsRouter;
