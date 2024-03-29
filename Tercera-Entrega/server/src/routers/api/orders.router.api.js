import CustomRouter from "../CustomRoouter.js";
import {
  create,
  read,
  report,
  upDate,
  destroy,
} from "../../controllers/orders.controlers.js";

export default class OrdersRouter extends CustomRouter {
  init() {
    this.create("/", ["USER", "PREM"], create);
    this.read("/", ["USER", "PREM"], read);
    this.read("/bills/:uid", ["ADMIN", "USER"], report);
    this.upDate("/:oid", ["PREM"], upDate);
    this.destroy("/:oid", ["PREM"], destroy);
  }
}
