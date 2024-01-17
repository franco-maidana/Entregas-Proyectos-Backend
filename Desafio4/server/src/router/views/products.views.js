import { Router } from "express";
import productos from "../../data/fs/product.fs.js";

const productsRouter = Router();

productsRouter.get("/", async (req, res, next) => {
  try {
    const all = await productos.read();
    return res.render("products", { products: all });
  } catch (error) {
    next(error);
  }
});
productsRouter.get("/real", (req, res, next) => {
  try {
    return res.render("real");
  } catch (error) {
    next(error);
  }
});

export default productsRouter;
