import { ordenManager } from "../../data/mongo/manager.model.js";
import { Router } from "express";

const OrdersRouter = Router();

OrdersRouter.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const one = await ordenManager.create(data);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
});

OrdersRouter.get("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const filter = { user_id: uid };
    const all = await ordenManager.read({ filter });
    return res.json({
      statusCode: 200,
      response: all,
    });
  } catch (error) {
    return next(error);
  }
});

OrdersRouter.put("/:oid", async (req, res, next) => {
  try {
    const { oid } = req.params;
    const data = req.body;
    const one = await ordenManager.update(oid, data);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
});

OrdersRouter.delete("/api/orders/:oid", async (req, res, next) => {
  try {
    const { oid } = req.params;
    const one = await ordenManager.destroy(oid);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
});

export default OrdersRouter;
