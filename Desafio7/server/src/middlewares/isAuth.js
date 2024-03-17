// esta autenticado ??
import { verifytoken } from "../utils/token.util.js";

export default (req, res, next) => {
  try {
    const token = req.token;
    const userData = verifytoken(token);
    if (userData !== undefined) {
      return next();
    } else {
      const error = new Error("Token inválido o expirado");
      error.statusCode = 401;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
};
