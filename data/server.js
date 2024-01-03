import express from "express";

const server = express();

const PORT = 8080;
const ready = () => console.log("server ready on port" + PORT);

// Endpoint
const ruta = "/";
const funcionQueVaALeer = (req, res) => {
  return res.status(200).send("My first express Server");
};

server.listen(PORT, ready);
