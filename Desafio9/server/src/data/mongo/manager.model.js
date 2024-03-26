import UsuarioMongo from "./models/users.model.js";
import productosMongo from "./models/products.model.js";
import OrderMongo from "./models/orders.model.js";
import comments from "./models/comment.model.js";
import notFoundOne from "../../utils/notFoundOne.utils.js";
import { Types } from "mongoose";

class MongoManager {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      const one = await this.model.create(data);
      return one._id;
    } catch (error) {
      throw error;
    }
  }

  async read(obj) {
    try {
      // console.log(obj);
      const { filter, orderAndPaginate } = obj;
      // const all = await this.model.find(filter).sort(order);
      const all = await this.model.paginate(filter, orderAndPaginate);
      // console.log(all);
      if (all.totalPages === 0) {
        const error = new Error("there aren't documents");
        error.statusCode = 404;
        throw error;
      }
      return all;
    } catch (error) {
      throw error;
    }
  }

  async reportBill(uid) {
    try {
      const report = await this.model.aggregate([
        { $match: { user_id: new Types.ObjectId(uid) } },
        {
          $lookup: {
            from: "products",
            foreignField: "_id",
            localField: "products_id",
            as: "products_id",
          },
        },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [{ $arrayElemAt: ["$products_id", 0] }, "$$ROOT"],
            },
          },
        },
        { $set: { subTotal: { $multiply: ["$price", "$quantity"] } } },
        { $group: { _id: "$user_id", total: { $sum: "$subTotal" } } },
        {
          $project: {
            _id: 0,
            user_id: "$_id",
            total: "$total",
            date: new Date(),
            currency: "USD",
          },
        },
      ]);
      return report;
    } catch (error) {
      throw error;
    }
  }

  //report(uid){} => en mongo calcular el total a pagar por un usuario por todos sus productos

  async report(uid) {
    try {
      const report = await this.model.aggregate([
        { $match: { user_id: new Types.ObjectId(uid) } },
        {
          $lookup: {
            from: "products",
            foreignField: "_id",
            localField: "products_id",
            as: "products_id",
          },
        },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [{ $arrayElemAt: ["$products_id", 0] }, "$$ROOT"],
            },
          },
        },
        { $set: { subTotal: { $multiply: ["$quantity", "$price"] } } },
        { $group: { _id: "$user_id", total: { $sum: "$subTotal" } } },
        {
          $project: {
            _id: 0,
            user_id: "$_id",
            total: "$total",
            date: new Date(),
            currency: "USD",
          },
        },
      ]);

      // Agregar registros de depuración para imprimir el resultado
      console.log("Reporte generado:", report);

      return report;
    } catch (error) {
      console.log("Error en la consulta de reporte:", error);
      throw error;
    }
  }

  async readOne(id) {
    if (!id) {
      throw new Error("El ID no es válido");
    }
    try {
      const one = await this.model.findById(id);
      notFoundOne(one);
      return one;
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    try {
      const opciones = { new: true }; // Esta opción devuelve el documento modificado en lugar del original
      const unoActualizado = await this.model.findByIdAndUpdate(
        id,
        data,
        opciones
      );
      notFoundOne(unoActualizado);
      return unoActualizado; // Asegúrate de devolver el documento actualizado
    } catch (error) {
      throw error;
    }
  }

  async destroy(id) {
    try {
      const one = await this.model.findByIdAndDelete(id);
      notFoundOne(one);
    } catch (error) {
      throw error;
    }
  }

  async readByEmail(email) {
    if (!email) {
      throw new Error("El correo electrónico no es válido");
    }
    try {
      const user = await this.model.findOne({ email });
      // notFoundOne(user); esta mal con las propiedades passport que le estamos pasando por va a tirar error si no existe y no tendria que pasar eso
      return user;
    } catch (error) {
      throw error;
    }
  }

  async stats({ filter }) {
    try {
      let stats = await this.model.find(filter).explain("executionStats");
      console.log(stats);
      stats = {
        quantity: stats.executionStats.nReturned,
        time: stats.executionStats.executionTimeMillis,
      };
      return stats;
    } catch (error) {
      throw error;
    }
  }
}

const Usuarios = new MongoManager(UsuarioMongo);
const productos = new MongoManager(productosMongo);
const ordenManager = new MongoManager(OrderMongo);
const Comments = new MongoManager(comments);

export { Usuarios, productos, ordenManager, Comments };

// productos.read(obj);
// productos.read(all);
