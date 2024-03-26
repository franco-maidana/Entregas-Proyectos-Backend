import serviceComments from "../services/comments.service.js";

class CommentsController {
  constructor() {
    this.model = serviceComments;
  }
  create = async (req, res, next) => {
    try {
      const data = req.body;
      data.user_id = req.user._id;
      const one = await this.model.create(data);
      return res.success201(one);
    } catch (error) {
      return next(error);
    }
  };

  read = async (req, res, next) => {
    try {
      const filter = {};
      const orderAndPaginate = {};
      const all = await this.model.read({ filter, orderAndPaginate });
      return res.success200(all);
    } catch (error) {
      return next(error);
    }
  };

  readOne = async (req, res, next) => {
    try {
      const { cid } = req.params;
      const one = await this.model.readOne(cid);
      return res.success200(one);
    } catch (error) {
      return next(error);
    }
  };

  upDate = async (req, res, next) => {
    try {
      const { cid } = req.params;
      const data = req.body;
      const one = await this.model.upDate(cid, data);
      return res.success200(one);
    } catch (error) {
      return next(error);
    }
  };

  destroy = async (req, res, next) => {
    try {
      const { cid } = req.params;
      const one = await this.model.destroy(cid);
      return res.success200(one);
    } catch (error) {
      return next(error);
    }
  };
}
export default CommentsController;
const controller = new CommentsController();
const { create, read, readOne, upDate, destroy } = controller;
export { create, read, readOne, upDate, destroy };
