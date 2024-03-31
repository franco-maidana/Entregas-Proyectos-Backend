import CustomRouter from "../CustomRoouter.js";
import { ordenManager } from "../../data/mongo/manager.model.js";

export default class OrdersRouter extends CustomRouter {
  init() {
    this.create("/", ["USER", "PREM"], async (req, res, next) => {
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

    this.read("/:uid", ["USER", "PREM"], async (req, res, next) => {
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

    this.upDate("/:oid", ["PREM"], async (req, res, next) => {
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

    this.destroy("/api/orders/:oid", ["PREM"], async (req, res, next) => {
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
  }
}
