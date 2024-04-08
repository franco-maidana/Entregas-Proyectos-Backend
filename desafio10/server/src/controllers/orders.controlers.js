import OrderService from "../services/order.service.js";

class OrdersControllers {
  constructor() {
    this.OrderService = OrderService;
  }
  create = async (req, res, next) => {
    try {
      const data = req.body;
      data.user_id = req.user._id;
      const one = await this.OrderService.create(data);
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
      const all = await this.OrderService.read({ filter, orderAndPaginate });
      return res.success201(all);
    } catch (error) {
      return next(error);
    }
  };

  report = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const report = await this.OrderService.report(uid);
      return res.success201(report);
    } catch (error) {
      return next(error);
    }
  };

  readOne = async (req, res, next) => {
    try {
      const { oid } = req.params; // Obtener el ID de la orden de los parámetros de la solicitud
      const order = await this.OrderService.readOne(oid); // Llamar al método readOne de OrderService para obtener la orden
      return res.success200(order); // Devolver la orden en la respuesta
    } catch (error) {
      return next(error); // Manejar cualquier error que ocurra
    }
  };

  upDate = async (req, res, next) => {
    try {
      const { oid } = req.params;
      const data = req.body;
      const one = await this.OrderService.upDate(oid, data);
      return res.success201(one);
    } catch (error) {
      return next(error);
    }
  };

  destroy = async (req, res, next) => {
    try {
      const { oid } = req.params;
      const response = await this.OrderService.destroy(oid);
      return res.success200(response);
    } catch (error) {
      return next(error);
    }
  };
}

export default OrdersControllers;
const controlers = new OrdersControllers();
const { create, read, readOne, report, upDate, destroy } = controlers;
export { create, read, readOne, report, upDate, destroy };
