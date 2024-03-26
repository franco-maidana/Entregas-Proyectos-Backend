import service from "../services/user.service.js";

class UsersControllers {
  constructor() {
    this.service = service;
  }
  create = async (req, res, next) => {
    try {
      const data = req.body;
      const response = await this.service.create(data);
      return res.success201(response);
    } catch (error) {
      return next(error);
    }
  };

  read = async (req, res, next) => {
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
      const all = await this.service.read({ filter, orderAndPaginate });
      return res.success201(all);
    } catch (error) {
      return next(error);
    }
  };

  readOne = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const one = await this.service.readOne(uid);
      return res.success201(one);
    } catch (error) {
      return next(error);
    }
  };

  upDate = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const data = req.body;
      const one = await this.service.update(uid, data);
      return res.success201(one);
    } catch (error) {
      return next(error);
    }
  };

  destroy = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const one = await this.service.destroy(uid);
      return res.success201(one);
    } catch (error) {
      return next(error);
    }
  };
}

export default UsersControllers;
const controllers = new UsersControllers();
const { create, read, readOne, upDate, destroy } = controllers;

export { create, read, readOne, upDate, destroy };
