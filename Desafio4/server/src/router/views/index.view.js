import { Router } from "express";
import productos from "../../data/fs/product.fs.js";

const viewsRouter = Router();

viewsRouter.get("/", (req, res, next) => {
  try {
    const mainProducts = productos.read();
    const date = new Date();
    return res.render("index", { products: mainProducts, date });
  } catch (error) {
    next(error);
  }
});

export default viewsRouter;
