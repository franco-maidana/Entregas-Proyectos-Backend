import CustomRouter from "../CustomRoouter.js";
// import Usuarios from "../../data/fs/users.fs.js";
import { Usuarios } from "../../data/mongo/manager.model.js";

export default class UsersRouter extends CustomRouter {
  init() {
    this.create("/", async (req, res, next) => {
      try {
        const data = req.body;
        const response = await Usuarios.create(data);
        return res.json({
          statusCode: 201,
          response,
        });
      } catch (error) {
        return next(error);
      }
    });

    this.read("/", async (req, res, next) => {
      try {
        let filter = {};
        let orderAndPaginate = {
          limit: req.query.limit || 20,
          page: req.query.limit || 1,
          // sort: { name: 1 },
        };
        if (req.query.email) {
          filter.email = new RegExp(req.query.email.trim(), "i");
        }
        if (req.query.name === "desc") {
          orderAndPaginate.sort.name = -1;
        }
        console.log("Entró aquí");
        const all = await Usuarios.read({ filter, orderAndPaginate });
        return res.json({
          statusCode: 200,
          response: all,
        });
      } catch (error) {
        return next(error);
      }
    });

    this.read("/:uid", async (req, res, next) => {
      try {
        const { uid } = req.params;
        const one = await Usuarios.readOne(uid);
        return res.json({
          statusCode: 200,
          response: one,
        });
      } catch (error) {
        return next(error);
      }
    });

    this.upDate("/:uid", async (req, res, next) => {
      try {
        const { uid } = req.params;
        const data = req.body;
        const one = await users.update(uid, data);
        return res.json({
          statusCode: 200,
          response: one,
        });
      } catch (error) {
        return next(error);
      }
    });

    this.destroy("/:uid", async (req, res, next) => {
      try {
        const { uid } = req.params;
        const one = await users.destroy(uid);
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
