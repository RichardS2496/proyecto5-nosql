const express = require("express");
const Movie = require("../models/Movie");
const router = express.Router();

//Crear un endpoint get que devuelva todas las películas.

router.get("/", async (req, res, next) => {
  try {
    const movies = await Movie.find();
    return res.status(200).json(movies);
  } catch (error) {
    return next(error);
  }
});

//Crear un endpoint get que devuelva una película según su _id

router.get("/:id", async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json("No movie found by this id");
    }
    return res.status(200).json(movie);
  } catch (error) {
    return next(error);
  }
});

// Crear un endpoint get que devuelva un valor por su titulo.

router.get("/title/:title", async (req, res, next) => {
  const { title } = req.params;
  try {
    const movieByTitle = await Movie.find({ title });
    return res.status(200).json(movieByTitle);
  } catch (error) {
    return next(error);
  }
});

// Crear un endpoint get que devuelva los documentos según su género.

router.get("/genre/:genre", async (req, res, next) => {
  const { genre } = req.params;

  try {
    const movieByGenre = await Movie.find({ genre });
    return res.status(200).json(movieByGenre);
  } catch (error) {
    return next(error);
  }
});

// Crear un endpoint get que devuelva las películas que se han estrenado a partir de 2010.

router.get("/year/:year", async (req, res, next) => {
  const { year } = req.params;

  try {
    const movieByYear = await Movie.find({ year: { $gte: year } });
    return res.status(200).json(movieByYear);
  } catch (error) {
    return next(error);
  }
});

// Metodo POST

router.post("/addMovie", async (req, res, next) => {
  try {
    const { title, director, year, genre } = req.body;
    const created = await new Movie({ title, director, year, genre }).save();
    return res.status(201).json(created);
  } catch (error) {
    return next(error);
  }
});

// Metodo PUT

router.put("/modifyMovie/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const movieModified = await Movie.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!movieModified) {
      return res.status(404).json("The movie doenst exist");
    }

    return res.status(200).json("The movie has been updated succesfully");
  } catch (error) {
    return next(error);
  }
});

// Metodo DELETE

router.delete("/deleteMovie/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await Movie.findByIdAndDelete(id);
    return res.status(200).json("Movie deleted!");
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
