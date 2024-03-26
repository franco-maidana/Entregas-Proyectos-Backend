import service from "../services/order.service.js";

class OrdersControllers {
  constructor() {
    this.service = service;
  }
  create = async (req, res, next) => {
    try {
      const data = req.body;
      data.user_id = req.user._id;
      const one = await this.service.create(data);
      return res.success201(one);
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

  report = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const report = await this.service.report(uid);
      return res.success201(report);
    } catch (error) {
      return next(error);
    }
  };

  upDate = async (req, res, next) => {
    try {
      const { oid } = req.params;
      const data = req.body;
      const one = await this.service.update(oid, data);
      return res.success201(one);
    } catch (error) {
      return next(error);
    }
  };

  destroy = async (req, res, next) => {
    try {
      const { oid } = req.params;
      const response = await this.service.destroy(oid);
      return res.success200(response);
    } catch (error) {
      return next(error);
    }
  };
}

export default OrdersControllers;
const controlers = new OrdersControllers();
const { create, read, report, upDate, destroy } = controlers;
export { create, read, report, upDate, destroy };
