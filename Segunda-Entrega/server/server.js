import "dotenv/config.js";

import express, { Router, response } from "express";
// import cosas de sockets
import { createServer } from "http";
import { Server } from "socket.io";
// importo cosas de sockets
import router from "./src/router/index.router.js";
import productsRouter from "./src/router/api/products.router.js";
import usersRouter from "./src/router/api/users.router.js";
import ordersRouter from "./src/router/api/orders.router.js";
import errorHandlerr from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import __dirname from "./utils.js";
import morgan from "morgan";
import { engine } from "express-handlebars";
import productos from "./src/data/fs/product.fs.js";
import dbconnection from "./src/utils/db.js";

const server = express();

const PORT = 8080;
const ready = () => {
  console.log("server ready on port" + PORT); // levanta el servidor
  dbconnection(); // llama a la base de datos de Mongo
};

// server.listen(PORT, ready);
const httpServer = createServer(server);
const socketServer = new Server(httpServer);
httpServer.listen(PORT, ready);
socketServer.on("connection", (socket) => {
  // console.log(socket);
  // sockeet es TODA la data que envia el cliente LUEGO del handshake
  console.log(socket.id);
  // vamos a emitir un mesaje de la parte del backend hacia la parte del frond
  socket.emit("welcome", "Bienvenido a la tienda TodoRopa");
  socket.emit("productos", productos.read());
  // recibimos datos del clientes
  socket.on("newProducts", async (data) => {
    try {
      console.log(data);
      // tengo que agregarlo al json de los productos con este metodo
      await productos.create(data);
      socket.emit("productos", productos.read());
    } catch (error) {
      console.log(error);
    }
  });
  // formulario
  socket.emit("formulario", "estamos en el sitio de formulario");
  socket.on("newProductForm", async (data) => {
    try {
      console.log(data);
      // Deberías agregarlo al JSON de productos con el método correspondiente
      await productos.create(data);
      socket.emit("productos", productos.read());
    } catch (error) {
      console.log(error);
    }
  });
});

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname + "/public"));
server.use(morgan("dev"));

server.use(productsRouter);
server.use(usersRouter);
server.use(ordersRouter);

//templates vistas
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

server.use("/", router);
server.use(pathHandler);
server.use(errorHandlerr);
