import { Router } from "express";
// import productos from "../../data/fs/products.fs.js";
import { productos } from "../../data/mongo/manager.model.js";
import isAdmin from "../../middlewares/isAdmin.mid.js";
import isAuth from "../../middlewares/isAuth.js";

const productsRouter = Router();

productsRouter.post("/", isAuth, isAdmin, async (req, res, next) => {
  try {
    const data = req.body;
    const response = await productos.create(data);
    return res.json({
      statusCode: 201,
      response,
    });
  } catch (error) {
    return next(error);
  }
});

productsRouter.get("/", async (req, res, next) => {
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
    console.log("esto es all ", all);
    if (all.length === 0) {
      return res.json({
        statusCode: 404,
        message: "Not found Users",
      });
    }
    return res.json({
      statusCode: 200,
      response: all,
    });
  } catch (error) {
    return next(error);
  }
});

productsRouter.get("/", async (req, res, next) => {
  try {
    const { eid } = req.params;
    const all = await productos.readOne(eid);
    return res.json({
      statusCode: 200,
      response: all,
    });
  } catch (error) {
    return next(error);
  }
});

productsRouter.delete("/:eid", async (req, res, next) => {
  try {
    const { eid } = req.params;
    const response = await productos.destroy(eid);
    return res.json({
      statusCode: 200,
      message: `Producto con ID ${pid} eliminado correctamente`,
      response,
    });
  } catch (error) {
    return next(error);
  }
});

export default productsRouter;
