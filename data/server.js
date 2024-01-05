import express from "express";

const server = express();

const PORT = 8080;
const ready = () => console.log("server ready on port" + PORT);

server.listen(PORT, ready);

// Endpoiont
const ruta = "/";
const funcionQueVaALeer = (req, res) => {
  return res.status(200).send("My first express Server");
};

server.get(ruta, funcionQueVaALeer);
