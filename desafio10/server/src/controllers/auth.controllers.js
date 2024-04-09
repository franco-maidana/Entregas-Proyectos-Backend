import service from "../services/user.service.js";

class AuthControllers {
  constructor() {
    this.service = service;
  }

  register = async (req, res, next) => {
    const { email, name, verifiedCode } = req.body;
    console.log("req.user", req.user);
    await this.service.register({ email, name, verifiedCode });
    try {
      return res.json({
        statusCode: 201,
        message: "Registered!",
      });
    } catch (error) {
      return next(error);
    }
  };
  login = async (req, res, next) => {
    try {
      req.login(req.user, function (err) {
        if (err) {
          return next(err);
        }
        return res
          .cookie("token", req.token, {
            maxAge: 7 * 24 * 60 * 60,
            httpOnly: true,
          })
          .json({
            statusCode: 200,
            message: "Logged in!",
          });
      });
    } catch (error) {
      return next(error);
    }
  };
  signout = async (req, res, next) => {
    try {
      return res.clearCookie("token").json({
        statusCode: 200,
        message: "Signed out!",
      });
    } catch (error) {
      return next(error);
    }
  }; // => ver por que no me saca la session de mongoDB
  me = async (req, res, next) => {
    try {
      if (req.user.email) {
        return res.json({
          statusCode: 200,
          message: "Session with email: " + req.user.email,
        });
      } else {
        const error = new Error("No Auth");
        error.statusCode = 400;
        throw error;
      }
    } catch (error) {
      return next(error);
    }
  };
  verfyAccount = async (req, res, next) => {
    try {
      const { email, verifieldCode } = req.body;
      const user = await service.readByEmail(email);
      if (user.verifieldCode === verifieldCode) {
        await service.update(user._id, { verified: true });
        return res.json({
          statusCode: 200,
          message: "Verifield User!",
        });
      } else {
        return res.json({
          statusCode: 400,
          message: "Invalid verifield token!",
        });
      }
    } catch (error) {
      return next(error);
    }
  };
}

const Controlers = new AuthControllers();
const { register, login, signout, me, verfyAccount } = Controlers;
export { register, login, signout, me, verfyAccount };
