import { verifytoken } from "../utils/token.util.js";

export default (req, res, next) => {
  try {
    const data = verifytoken(req.cookies["token"]);
    const { role } = data;
    if (role === 1) {
      return next();
    } else {
      const error = new Error("forbidden");
      error.statusCode = 403;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
};
