import CustomRouter from "../CustomRoouter.js";
// import productos from "../../data/fs/products.fs.js";
import isAuth from "../../middlewares/isAuth.js";
import {
  create,
  read,
  readOne,
  update,
  destroy,
} from "../../controllers/products.controlers.js";

export default class ProductsRouter extends CustomRouter {
  init() {
    this.create("/", ["ADMIN", "PREM"], isAuth, create);

    this.read("/", ["PUBLIC"], read);

    this.read("/:eid", ["PUBLIC"], readOne);

    this.upDate("/:eid", ["ADMIN", "PREM"], update);

    this.destroy("/:eid", ["ADMIN", "PREM"], destroy);
  }
}
