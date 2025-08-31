const express = require("express");
const { connect } = require("./utils/db");
const movieRoutes = require("./routes/movie.routes");

connect();

const PORT = 3030;
const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.get("/", (req, res) => res.send("Funcionando..."));

server.use("/movies", movieRoutes);

server.use((req, res, next) => {
  const error = new Error("Route not found");
  error.status = 404;
  next(error);
});

server.use((error, req, res, next) => {
  return res
    .status(error.status || 500)
    .json(error.message || "Unexpected error");
});

server.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});
