import { Router } from "express";
import ordenManager from "../../data/fs/ordersManager.fs.js";

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

ordersRouter.get("/api/orders/:uid", async (req, res) => {
  try {
    // Obtener el uid de la URL
    const { uid } = req.params;

    console.log(`Buscando órdenes para el usuario con UID: ${uid}`);

    const userOrders = await ordenManager.readByUser(uid);

    console.log(`Órdenes encontradas:`, userOrders);

    if (userOrders.length === 0) {
      return res.json({
        statusCode: 404,
        message: "No se encontraron órdenes para este usuario",
      });
    }

    return res.json({
      statusCode: 200,
      response: userOrders,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      message: error.message,
    });
  }
});

export default ordersRouter;
