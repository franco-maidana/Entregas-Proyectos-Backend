import fs from "fs";
import crypto from "crypto";

class ProductManager {
  static #productosGuardados = [];

  constructor(path) {
    this.path = path;
    this.init();
  }

  init() {
    const exist = fs.existsSync(this.path);
    console.log(exist);
    if (!exist) {
      fs.writeFileSync(this.path, JSON.stringify([], null, 2));
    } else {
      ProductManager.#productosGuardados = JSON.parse(
        fs.readFileSync(this.path, "utf-8")
      );
    }
  }

  async create(data) {
    try {
      const newProduct = {
        id: crypto.randomBytes(12).toString("hex"),
        title: data.title,
        photo: data.photo,
        price: data.price,
        stock: data.stock,
        date: data.date || new Date(),
      };
      ProductManager.#productosGuardados.push(newProduct);

      await fs.promises.writeFile(
        this.path,
        JSON.stringify(ProductManager.#productosGuardados, null, 2),
        "utf-8"
      );
      // console.log(newProduct);
      return newProduct;
    } catch (error) {
      console.error(error.message);
      return error.message;
    }
  }

  read(obj) {
    try {
      // const { filter, orderAndPaginate } = obj; => se destructura mas adelante
      const usersData = fs.readFileSync(this.path, "utf-8"); // Corregir la lectura del archivo
      const users = JSON.parse(usersData);
      // console.log(users);
      return users;
    } catch (error) {
      console.error("Error al leer o parsear el archivo:", error.message);
      return null;
    }
  }

  readOne(id) {
    try {
      const newProduct = ProductManager.#productosGuardados.find(
        (each) => each.id === id
      );
      if (newProduct) {
        console.log(newProduct);
        return newProduct;
      } else {
        throw new Error("producto no encontrado");
      }
    } catch (error) {
      // console.log(error.message);
      return error.message;
    }
  }

  async destroy(id) {
    try {
      const index = ProductManager.#productosGuardados.findIndex(
        (product) => product.id === id
      );
      if (index !== -1) {
        ProductManager.#productosGuardados.splice(index, 1);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(ProductManager.#productosGuardados, null, 2),
          "utf-8"
        );
        console.log("Producto eliminado:", id);
        return "Producto eliminado correctamente.";
      } else {
        throw new Error("Producto no encontrado");
      }
    } catch (error) {
      console.error("Error al eliminar el producto:", error.message);
      return error.message;
    }
  }

  async update(id, data) {
    try {
      const index = ProductManager.#productosGuardados.findIndex(
        (product) => product.id === id
      );
      if (index !== -1) {
        ProductManager.#productosGuardados[index] = {
          ...ProductManager.#productosGuardados[index],
          ...data,
        };
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(ProductManager.#productosGuardados, null, 2),
          "utf-8"
        );
        console.log(
          "Producto actualizado:",
          ProductManager.#productosGuardados[index]
        );
        return ProductManager.#productosGuardados[index];
      } else {
        throw new Error("Producto no encontrado");
      }
    } catch (error) {
      console.error(error.message);
      return error.message;
    }
  }
}

const productos = new ProductManager("./src/data/fs/files/productos.json");

export default productos;
