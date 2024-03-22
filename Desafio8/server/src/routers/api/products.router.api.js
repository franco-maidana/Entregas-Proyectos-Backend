// import { Router } from "express";
import CustomRouter from "../CustomRoouter.js";
// import productos from "../../data/fs/products.fs.js";
import { productos } from "../../data/mongo/manager.model.js";
import isAdmin from "../../middlewares/isAdmin.mid.js";
import isAuth from "../../middlewares/isAuth.js";

export default class ProductsRouter extends CustomRouter {
  init() {
    this.create(
      "/",
      ["ADMIN", "PREM"],
      isAuth,
      isAdmin,
      async (req, res, next) => {
        try {
          const data = req.body;
          const response = await productos.create(data);
          return res.success200(response);
        } catch (error) {
          return next(error);
        }
      }
    );

    this.read("/", ["PUBLIC"], async (req, res, next) => {
      try {
        let filter = {};
        let orderAndPaginate = { lean: true };
        if (req.query.user_id) {
          filter = { user_id: req.query.user_id };
        }
        if (req.query.order) {
          const [field, sortOrder] = req.query.order.split(":");
          if (field && sortOrder) {
            orderAndPaginate[field] =
              sortOrder.toLowerCase() === "asc" ? 1 : -1;
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
        return res.success200(all);
      } catch (error) {
        return next(error);
      }
    });

    this.read("/", ["PUBLIC"], async (req, res, next) => {
      try {
        const { eid } = req.params;
        const all = await productos.readOne(eid);
        return res.success200(all);
      } catch (error) {
        return next(error);
      }
    });

    this.upDate("/:eid", ["ADMIN", "PREM"], async (req, res, next) => {
      try {
        const { eid } = req.params;
        const data = req.body;
        const response = await productos.update(eid, data);
        return res.success200(response);
      } catch (error) {
        return next(error);
      }
    });

    this.destroy("/:eid", ["ADMIN", "PREM"], async (req, res, next) => {
      try {
        const { eid } = req.params;
        const response = await productos.destroy(eid);
        return res.success200(response);
      } catch (error) {
        return next(error);
      }
    });
  }
}
