import CustomRouter from "../CustomRoouter.js";
// import Usuarios from "../../data/fs/users.fs.js";
import {
  create,
  read,
  readOne,
  update,
  destroy,
} from "../../controllers/user.controllers.js";

export default class UsersRouter extends CustomRouter {
  init() {
    this.create("/", ["PUBLIC"], create);

    this.read("/", ["USER", "PREM"], read);

    this.read("/:uid", ["USER", "PREM"], readOne);

    this.upDate("/:uid", ["USER", "PREM"], update);

    this.destroy("/:uid", ["USER", "PREM"], destroy);
  }
}
