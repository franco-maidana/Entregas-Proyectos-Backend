import { Router } from "express";
// import productos from "../../data/fs/products.fs.js";
import { productos } from "../../data/mongo/manager.model.js";
import isAdmin from "../../middlewares/isAdmin.mid.js";
import passport from "../../middlewares/passport.mid.js";

const productsRouter = Router();
//rutas de vista todas con get

// ruteo donde se muestran todos los productos de la lista
productsRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
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
      const all = await productos.read({ filter, orderAndPaginate });
      return res.render("products", { products: all.docs });
    } catch (error) {
      next(error);
    }
  }
);

// sitio donde se agregan productos nuevos
productsRouter.get(
  "/real",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  (req, res, next) => {
    try {
      return res.render("real");
    } catch (error) {
      return next(error);
    }
  }
);

// ruta para la creacion de productos y subirlo a la base de datos
productsRouter.post("/real", isAdmin, async (req, res, next) => {
  try {
    // Obtener los datos del cuerpo de la solicitud
    const { title, photo, price, stock } = req.body;
    // Guardar el nuevo producto en la base de datos MongoDB
    const newProduct = await productos.create({ title, photo, price, stock });
    // Enviar una respuesta con un mensaje de éxito
    res.json({ message: "producto creado exitosamente", product: newProduct });
  } catch (error) {
    return next(error);
  }
});
// ver por que no me actualiza los productos de la base de datos a la parte de la vista
export default productsRouter;
