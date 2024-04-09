import service from "../services/products.service.js";

class ProductsControllers {
  constructor() {
    this.service = service;
  }
  create = async (req, res, next) => {
    try {
      const data = req.body;
      const response = await this.service.create(data);
      return res.success200(response);
    } catch (error) {
      return next(error);
    }
  };

  read = async (req, res, next) => {
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
      const all = await this.service.read({ filter, orderAndPaginate });
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
  };

  readOne = async (req, res, next) => {
    try {
      const { eid } = req.params;
      const all = await this.service.readOne(eid);
      return res.success200(all);
    } catch (error) {
      return next(error);
    }
  };

  upDate = async (req, res, next) => {
    try {
      const { eid } = req.params;
      const data = req.body;
      const response = await this.service.update(eid, data);
      return res.success200(response);
    } catch (error) {
      return next(error);
    }
  };

  destroy = async (req, res, next) => {
    try {
      const { eid } = req.params;
      const response = await this.service.destroy(eid);
      return res.success200(response);
    } catch (error) {
      return next(error);
    }
  };
}

export default ProductsControllers;
const controllers = new ProductsControllers();
const { create, read, readOne, upDate, destroy } = controllers;

export { create, read, readOne, upDate, destroy };
// se exporta a Products.router.api
