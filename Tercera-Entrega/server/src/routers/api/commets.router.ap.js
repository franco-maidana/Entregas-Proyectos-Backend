import CustomRouter from "../CustomRoouter.js";
import {
  create,
  read,
  readOne,
  upDate,
  destroy,
} from "../../controllers/commets.controllers.js";

class CommentsRouter extends CustomRouter {
  init() {
    this.create("/", ["USER", "PREM"], create);
    this.read("/", ["PUBLIC"], read);
    this.read("/:cid", ["PUBLIC"], readOne);
    this.upDate("/:cid", ["USER", "PREM"], upDate);
    this.destroy("/:cid", ["USER", "PREM", "ADMIN"], destroy);
  }
}

let commentsRouter = new CommentsRouter();
commentsRouter = commentsRouter.getRouter();

export default commentsRouter;
