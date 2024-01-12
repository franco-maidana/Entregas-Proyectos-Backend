import express, { Router, response } from "express";
import router from "./src/router/index.router.js";
import productsRouter from "./src/router/api/products.router.js";
import usersRouter from "./src/router/api/users.router.js";
import ordersRouter from "./src/router/api/orders.router.js";
import errorHandlerr from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import __dirname from "./utils.js";
import morgan from "morgan";

const server = express();

const PORT = 8080;
const ready = () => console.log("server ready on port" + PORT);

server.listen(PORT, ready);

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname + "/public"));
server.use(morgan("dev"));

server.use(productsRouter);
server.use(usersRouter);
server.use(ordersRouter);

server.use("/", router);
server.use(pathHandler);
server.use(errorHandlerr);
