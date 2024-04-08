import CustomRouter from "../CustomRoouter.js";
import {
  create,
  read,
  report,
  readOne,
  upDate,
  destroy,
} from "../../controllers/orders.controlers.js";

export default class OrdersRouter extends CustomRouter {
  init() {
    this.create("/", ["USER", "ADMIN", "PREM"], create);
    this.read("/", ["USER", "ADMIN", "PREM"], read);
    this.read("/bills/:uid", ["ADMIN", "USER"], report);
    this.read("/:oid", ["ADMIN", "USER"], readOne);
    this.upDate("/:oid", ["PREM", "ADMIN"], upDate);
    this.destroy("/:oid", ["PREM", "ADMIN"], destroy);
  }
}
