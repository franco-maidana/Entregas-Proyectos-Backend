import service from "../services/user.service.js";
import CustomError from "../utils/errors/CustomError.utils.js";
import errors from "../utils/errors/error.js";
import logger from "../utils/logger/index.js";

class UsersControllers {
  constructor() {
    this.service = service;
  }
  create = async (req, res, next) => {
    try {
      const data = req.body;
      logger.INFO(JSON.stringify(data));
      await this.service.create(data);
      return res.success201(data);
    } catch (error) {
      return next(error);
    }
  };

  read = async (req, res, next) => {
    try {
      const orderAndPaginate = {
        limit: req.query.limit || 10,
        page: req.query.page || 1,
        sort: { title: 1 },
        lean: true,
      };
      const filter = {};
      if (req.query.title) {
        filter.title = new RegExp(req.query.title.trim(), "i");
      }
      if (req.query.sort === "desc") {
        orderAndPaginate.sort.title = "desc";
      }
      const all = await this.service.read({ filter, orderAndPaginate });
      if (all.docs.length > 0) {
        return res.success200(all);
      }
      CustomError.new(errors.notFound);
    } catch (error) {
      return next(error);
    }
  };

  readOne = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const one = await this.service.readOne(uid);
      if (one) {
        return res.success200(one);
      }
      CustomError.new(errors.notFound);
    } catch (error) {
      return next(error);
    }
  };

  readByEmail = async (req, res, next) => {
    try {
      const { email } = req.params;
      const response = await this.service.readByEmail(email);
      if (response) {
        return res.success200(response);
      }
      CustomError.new(errors.notFound);
    } catch (error) {
      return next(error);
    }
  };

  update = async (req, res, next) => {
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
      if (one) {
        return res.success200(one);
      }
      CustomError.new(errors.notFound);
    } catch (error) {
      return next(error);
    }
  };
}

export default UsersControllers;
const controllers = new UsersControllers();
const { create, read, readOne, update, destroy, readByEmail } = controllers;

export { create, read, readOne, update, destroy, readByEmail };
