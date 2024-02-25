import UsuarioMongo from "./models/users.model.js";
import productosMongo from "./models/products.model.js";
import OrderMongo from "./models/orders.model.js";
import notFoundOne from "../../utils/notFoundOne.utils.js";

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
      const { filter, order } = obj;
      const all = await this.model
        .find(filter)
        .populate({ path: "user_id", options: { strictPopulate: false } })
        .populate({ path: "products_id", options: { strictPopulate: false } })
        .sort(order);
      if (all.length === 0) {
        const error = new Error("there aren't documents");
        error.statusCode = 404;
        throw error;
      }
      return all;
    } catch (error) {
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
      notFoundOne(user); // Asume que existe una función notFoundOne para manejar el caso cuando el usuario no se encuentra
      return user;
    } catch (error) {
      throw error;
    }
  }
}

const Usuarios = new MongoManager(UsuarioMongo);
const productos = new MongoManager(productosMongo);
const ordenManager = new MongoManager(OrderMongo);

export { Usuarios, productos, ordenManager };
