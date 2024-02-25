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

ordersRouter.get("/api/orders/bills/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const reporte = await ordenManager.reportBill(uid);
    return res.json({
      statusCode: 200,
      response: reporte,
    });
  } catch (error) {
    return next(error);
  }
});

// ordersRouter.get("/api/orders/total/:uid") => debe de implementar el metodo report(uid) de mongo

ordersRouter.get("/api/orders/total/:uid", async (req, res) => {
  const uid = req.params.uid;
  console.log("Valor de uid:", uid);
  try {
    const reportData = await ordenManager.report(uid);
    console.log("reprt data es = :", reportData);
    // Verificar si reportData es null o vacío
    if (reportData && reportData.length > 0 && reportData[0].total !== null) {
      res.json({ total: reportData[0].total });
    } else {
      // Manejar el caso en que reportData es null o vacío
      res.json({ total: 0 });
    }
  } catch (error) {
    console.log("Error en la consulta de reporte:", error);
    return res.status(500).json({
      statusCode: 500,
      response: error.message,
      message: "Error al obtener el total",
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
