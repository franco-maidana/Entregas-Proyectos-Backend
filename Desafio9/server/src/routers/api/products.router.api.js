import CustomRouter from "../CustomRoouter.js";
// import productos from "../../data/fs/products.fs.js";
import isAuth from "../../middlewares/isAuth.js";
import {
  create,
  read,
  readOne,
  upDate,
  destroy,
} from "../../controllers/products.controlers.js";

export default class ProductsRouter extends CustomRouter {
  init() {
    this.create("/", ["ADMIN", "PREM"], isAuth, create);

    this.read("/", ["PUBLIC"], read);

    this.read("/:eid", ["PUBLIC"], readOne);

    this.upDate("/:eid", ["ADMIN", "PREM"], upDate);

    this.destroy("/:eid", ["ADMIN", "PREM"], destroy);
  }
}
