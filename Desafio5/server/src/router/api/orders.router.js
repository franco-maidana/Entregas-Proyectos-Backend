import { Router } from "express";
// import ordenManager from "../../data/fs/ordersManager.fs.js";
import { ordenManager } from "../../data/mongo/manager.model.js";

const ordersRouter = Router();

ordersRouter.post("/api/orders", async (req, res) => {
  try {
    const productData = req.body;

    const createdProduct = await ordenManager.create(productData);
    console.log(createdProduct);
    return res.status(201).json({
      statusCode: 201,
      message: "Orden creada exitosamente",
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: error.message || "Ha ocurrido un error al crear la orden",
    });
  }
});

ordersRouter.get("/api/orders", async (req, res) => {
  try {
    let filter = {};
    let order = {};

    if (req.query.user_id) {
      filter = { user_id: req.query.user_id };
    }

    if (req.query.order) {
      const [field, sortOrder] = req.query.order.split(":");
      if (field && sortOrder) {
        order[field] = sortOrder.toLowerCase() === "asc" ? 1 : -1;
      }
    }

    const all = await ordenManager.read({ filter, order });
    return res.json({
      statusCode: 200,
      response: all,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: error.message || "Ha ocurrido un error al crear la orden",
    });
  }
});

ordersRouter.get("/api/ordes/:oid", async (req, res) => {
  try {
    const { oid } = req.params;
    const one = await ordenManager.readOne(oid);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message:
        error.message ||
        "Ha ocurrido un error al obtener las órdenes del usuario",
    });
  }
});

ordersRouter.put("/api/orders/:oid", async (req, res) => {
  try {
    const { oid } = req.params;
    const data = req.body;
    const one = await ordenManager.update(oid, data);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return res.json({
      statusCode: 500,
      response: error.menssage,
      message: "error al obtener las ordenes",
    });
  }
});

ordersRouter.delete("/api/orders/:oid", async (req, res) => {
  try {
    const { oid } = req.params;
    const one = await ordenManager.destroy(oid);
    return res.json({
      statusCode: 200,
      response: one,
      message: "Orden eliminada Correctamente",
    });
  } catch (error) {
    return res.json({
      statusCode: 500,
      response: error.menssage,
      message: "Error al obtener la orden",
    });
  }
});

export default ordersRouter;
