const fs = require("fs");
const crypto = require("crypto");

class ProductManager {
  static #productosGuardados = [];

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

  constructor(path) {
    this.path = path;
    this.init();
  }

  async create(data) {
    try {
      if (!data.title || !data.photo || !data.price || !data.stock) {
        throw new Error("title, photo, price, stock are required");
      } else {
        const newProduct = {
          id: crypto.randomBytes(12).toString("hex"),
          title: data.title,
          photo: data.photo,
          price: data.price,
          stock: data.stock,
        };

        ProductManager.#productosGuardados.push(newProduct);

        await fs.promises.writeFile(
          this.path,
          JSON.stringify(ProductManager.#productosGuardados, null, 2)
        );
        console.log(newProduct.id);
        return newProduct;
      }
    } catch (error) {
      console.error(error.message);
      return error.message;
    }
  }

  read() {
    try {
      if (ProductManager.#productosGuardados.length === 0) {
        throw new Error("producto no encontrado");
      } else {
        console.log(ProductManager.#productosGuardados);
        return ProductManager.#productosGuardados;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
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
      console.log(error.message);
      return error.message;
    }
  }

  async destroy(id) {
    try {
      const newProduct = ProductManager.#productosGuardados.find(
        (each) => each.id === id
      );
      if (newProduct) {
        ProductManager.#productosGuardados =
          ProductManager.#productosGuardados.filter((each) => each.id !== id);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(ProductManager.#productosGuardados, null, 2)
        );
      } else {
        throw new Error("producto no encontrado");
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
}

const productos = new ProductManager("./fs/files/productos.json");

productos.create({
  title: "Pantalones",
  photo: "fotoRandom",
  price: 250,
  stock: 50,
});

async function manage() {
  await productos.read();
  await productos.readOne();
  await productos.readOne();
  await productos.destroy(1); // cuando se pone el id aca se tira error y no me toma
}

manage();
