import { Router } from "express";

const viewsRouter = Router();

viewsRouter.get("/", (req, res, next) => {
  try {
    const mainProducts = ["remeras", "pantalones", "buzos"];
    const date = new Date();
    return res.render("index", { products: mainProducts, date });
  } catch (error) {
    next(error);
  }
});

export default viewsRouter;
