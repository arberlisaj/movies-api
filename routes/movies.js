const Joi = require("joi");
const express = require("express");
const router = express.Router();

let movies = [
  { id: 0, title: "Inception" },
  { id: 1, title: "The Shawshank Redemption" },
  { id: 2, title: "The Godfather" },
  { id: 3, title: "The Dark Knight" },
  { id: 4, title: "Pulp Fiction" },
  { id: 5, title: "The Lord of the Rings: The Return of the King" },
  { id: 6, title: "Forrest Gump" },
  { id: 7, title: "Fight Club" },
  { id: 8, title: "The Matrix" },
  { id: 9, title: "Goodfellas" },
];

router.get("/", (req, res) => {
  res.send(movies);
});

router.get("/:id", (req, res) => {
  const movie = movies.find((movie) => movie.id === parseInt(req.params.id));
  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");
  res.send(movie);
});

router.post("/", (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const movie = {
    id: movies.length + 1,
    title: req.body.title,
  };
  movies.push(movie);
  res.send(movie);
});

router.put("/:id", (req, res) => {
  const movie = movies.find((movie) => movie.id === parseInt(req.params.id));
  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");

  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  movie.title = req.body.title;
  res.send(movie);
});

router.delete("/:id", (req, res) => {
  const movie = movies.find((movie) => movie.id === parseInt(req.params.id));
  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");

  const index = movies.indexOf(movie);
  movies.splice(index, 1);

  res.send(movie);
});

function validateMovie(movie) {
  const schema = Joi.object({ title: Joi.string().min(6).required() });
  return schema.validate(movie);
}

module.exports = router;
