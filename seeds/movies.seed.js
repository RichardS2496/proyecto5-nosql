const mongoose = require("mongoose");
const Movie = require("../models/Movie");

const movies = [
  {
    title: "The Matrix",
    director: "Hermanas Wachowski",
    year: 1999,
    genre: "Acción",
  },
  {
    title: "The Matrix Reloaded",
    director: "Hermanas Wachowski",
    year: 2003,
    genre: "Acción",
  },
  {
    title: "Buscando a Nemo",
    director: "Andrew Stanton",
    year: 2003,
    genre: "Animación",
  },
  {
    title: "Buscando a Dory",
    director: "Andrew Stanton",
    year: 2016,
    genre: "Animación",
  },
  {
    title: "Interestelar",
    director: "Christopher Nolan",
    year: 2014,
    genre: "Ciencia ficción",
  },
  {
    title: "50 primeras citas",
    director: "Peter Segal",
    year: 2004,
    genre: "Comedia romántica",
  },
];

const movieDocuments = movies.map((movie) => new Movie(movie));

mongoose
  .connect("mongodb://localhost:27017/movies", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    const allMovies = await Movie.find();

    if (allMovies.length) {
      await Movie.collection.drop();
    }
  })
  .catch((error) => {
    console.error(`Error deleting data: ${error}`);
  })
  .then(async () => {
    await Movie.insertMany(movieDocuments);
  })
  .catch((error) => console.error(`Error creating data: ${error}`))
  .finally(() => mongoose.disconnect());
