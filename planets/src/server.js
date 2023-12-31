const express = require("express");
const morgan = require("morgan");

const server = express();

server.use(morgan("dev"));

server.use(express.json());

server.use("/planets", require("./routes"));

server.use("*", (req, res) => {
  res.status(404).send("Not found");
});

server.use((err, req, res, next) => {
  //cualquier error que tenga, yo lo voy a unificar y manejar de una sola manera.
  res.status(err.statusCode || 500).send({
    error: true,
    message: err.message,
  });
});

module.exports = server;
