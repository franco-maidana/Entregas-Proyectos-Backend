import "dotenv/config.js";
import express from "express";
import router from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import __dirname from "./utils.js";
import morgan from "morgan";
import { engine } from "express-handlebars";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import sessionFileStore from "session-file-store";
import MongoStore from "connect-mongo";
import dbconnection from "./src/utils/db.js";
import passport from "./src/middlewares/passport.mid.js"; // Asegúrate de que esta ruta es correcta

// server
const server = express();
const PORT = 8080;
const ready = () => {
  console.log("server ready on port " + PORT);
  dbconnection();
};

server.listen(PORT, ready);

//templates
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

const FileStore = sessionFileStore(expressSession);

//middlewares
server.use(cookieParser(process.env.SECRET_KEY));

// MONGO STORAGE
server.use(
  expressSession({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
      ttl: 7 * 24 * 60 * 60,
      mongoUrl: process.env.BD_MONGO,
    }),
  })
);

// Inicializar Passport y restaurar la sesión del usuario, si existe
server.use(passport.initialize());
server.use(passport.session());

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname + "/public"));
server.use(morgan("dev"));
server.use("/", router);
server.use(errorHandler);
server.use(pathHandler);
