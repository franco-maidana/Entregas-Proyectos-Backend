// import args from "../utils/args.utils.js"

const environment = "dev";
let dao = {};

switch (environment) {
  case "test":
    // vamos a usar MEMORY
    console.log("MEMORY CONNECTED");
    // me traigo las ordenes de memori y las renombro
    const { default: productsMemory } = await import(
      "./memory/product.memory.js"
    );
    dao = { productos: productsMemory };
    break;
  case "dev":
    // vamos a usar FS
    console.log("FS CONNECTED");
    // me traigos las ordenes de memory y los renombros despues los mando por el dao
    const { default: productsFS } = await import("./fs/products.fs.js");
    dao = { productos: productsFS };
    break;
  case "prod":
    // vamos a usar MONGO
    console.log("MONGO CONNECTED");
    // me traigo las ordenes de mongo y los renombros despues los mando por dao MONGO CONECT TENDRIA QUE IR ACA
    const { default: productsMongo } = await import(
      "./mongo/products.mongo.js"
    );
    dao = { productos: productsMongo };
    break;

  default:
    break;
}

export default dao;
// lo exportamos al archivo service
