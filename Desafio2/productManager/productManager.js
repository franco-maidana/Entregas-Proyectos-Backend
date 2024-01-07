const fs = require("fs");

class ProductManager {
  static productosGuardados = [];

  create(data) {
    const Eventos = {
      id:
        ProductManager.productosGuardados.length === 0
          ? 1
          : ProductManager.productosGuardados[
              ProductManager.productosGuardados.length - 1
            ].id + 1,
      title: data.title,
      photo: data.photo,
      price: data.price,
      stock: data.stock || null,
    };
    ProductManager.productosGuardados.push(Eventos);
  }
  // datos de productos cargados en el JSON
  datosDeLaRuta(ruta) {
    try {
      const jsonData = JSON.stringify(
        ProductManager.productosGuardados,
        null,
        2
      );
      fs.writeFileSync(ruta, jsonData, "utf-8");
      console.log("El Archivo Se Creó Exitosamente");
    } catch (error) {
      console.error("Ocurrió un Error al Obtener el Archivo:", error);
    }
  }
  // datos obtenidos del JSON y mostrado
  read(ruta) {
    try {
      const datosLeidos = JSON.parse(fs.readFileSync(ruta, "utf-8"));
      console.log(datosLeidos);
    } catch (error) {
      console.error("Ocurrió un Error al Leer el Archivo:", error);
    }
  }
  // datos obtenidos de productos medinte el id
  readOnId(id) {
    const foundProduct = ProductManager.productosGuardados.find(
      (product) => product.id === id
    );
    return foundProduct || null;
  }
}

const ruta = "./desafio2/productManager/data/productos.json";

// Ejemplo de uso
const manager = new ProductManager();
manager.create({
  title: "Pantalones",
  photo: "fotoRandon",
  price: 250,
  stock: 50,
});
manager.create({
  title: "Remera",
  photo: "FotoRandom2",
  price: 150,
  stock: 15,
});

manager.datosDeLaRuta(ruta);
manager.read(ruta);
console.log(manager.readOnId(1));
console.log(manager.readOnId(2));
