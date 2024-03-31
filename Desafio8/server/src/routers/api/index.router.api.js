import CustomRouter from "../CustomRoouter.js";
import UsersRouter from "./user.router.api.js";
import ProductsRouter from "./products.router.api.js";
import OrdersRouter from "./orders.router.api.js";
// import cookiesRouter from "./cookies.router.api.js"; => es solo de ejemplo
import sessionsRouter from "./sessions.router.api.js";
// import passport from "../../middlewares/passport.mid.js";
import passCallBack from "../../middlewares/passCallBack.js";

const products = new ProductsRouter();
const Users = new UsersRouter();
const Orders = new OrdersRouter();

export default class ApiRouter extends CustomRouter {
  init() {
    this.router.use("/users", Users.getRouter());
    this.router.use("/products", products.getRouter());
    this.router.use("/orders", passCallBack("jwt"), Orders.getRouter());
    this.router.use("/session", sessionsRouter);
  }
}
