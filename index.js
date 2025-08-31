const express = require("express");
const { connect } = require("./utils/db");
const Movie = require("./models/Movie");
const router = express.Router();

connect();

const PORT = 3030;
const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.get("/", (req, res) => res.send("Funcionando..."));

//Crear un endpoint get que devuelva todas las películas.

router.get("/movies", async (req, res) => {
  try {
    const movies = await Movie.find();
    return res.status(200).json(movies);
  } catch (error) {
    return res.status(500).json(error);
  }
});

//Crear un endpoint get que devuelva una película según su _id

router.get("/movies/id/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const movie = await Movie.findById(id);
    if (movie) {
      return res.status(200).json(movie);
    } else {
      return res.status(404).json("No movie found by this id");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

// Crear un endpoint get que devuelva un valor por su titulo.

router.get("/movies/title/:title", async (req, res) => {
  const { title } = req.params;
  try {
    const movieByTitle = await Movie.find({ title });
    return res.status(200).json(movieByTitle);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// Crear un endpoint get que devuelva los documentos según su género.

router.get("/movies/genre/:genre", async (req, res) => {
  const { genre } = req.params;

  try {
    const movieByGenre = await Movie.find({ genre });
    return res.status(200).json(movieByGenre);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// Crear un endpoint get que devuelva las películas que se han estrenado a partir de 2010.

router.get("/movies/year/:year", async (req, res) => {
  const { year } = req.params;

  try {
    const movieByYear = await Movie.find({ year: { $gte: year } });
    return res.status(200).json(movieByYear);
  } catch (error) {
    return res.status(500).json(error);
  }
});

server.use("/", router);

server.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});
