import { Router } from "express";
<<<<<<< HEAD
import productos from "../../data/fs/product.fs.js";
=======
>>>>>>> 34e14413fe6bb275abfed6ea28d55270d119d948

const viewsRouter = Router();

viewsRouter.get("/", (req, res, next) => {
  try {
<<<<<<< HEAD
    const mainProducts = productos.read();
=======
    const mainProducts = ["remeras", "pantalones", "buzos"];
>>>>>>> 34e14413fe6bb275abfed6ea28d55270d119d948
    const date = new Date();
    return res.render("index", { products: mainProducts, date });
  } catch (error) {
    next(error);
  }
});

export default viewsRouter;
