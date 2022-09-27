import React, { Component, useState, useEffect } from "react";
import Joi from "joi-browser";
import {
  handleOnChange,
  handleSubmit,
  validate,
  renderButton,
  renderInput,
  renderSelect,
} from "./common/form";

import { getGenres } from "../services/fakeGenreService";
import { getMovie, saveMovie, getMovies } from "../services/fakeMovieService";

function MovieForm({ match, history }) {
  const [movie, setMovie] = useState({
    title: "",
    genreId: "",
    numberInStock: "",
    dailyRentalRate: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    genreId: "",
    numberInStock: "",
    dailyRentalRate: "",
  });

  const [genres, setGenres] = useState(getGenres());

  const schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label("Number In Stock"),
    dailyRentalRate: Joi.number()
      .min(0)
      .max(10)
      .required()
      .label("Daily Rental Rate"),
  };

  function doHandle({ currentTarget: input }) {
    const { error, data } = handleOnChange(input, errors, movie, schema);
    setMovie(data);
    setErrors(error);
  }

  function doSubmit(e) {
    const validatedErrors = handleSubmit(e, movie, schema);
    setErrors(validatedErrors);

    if (validatedErrors) return;

    saveMovie(movie);

    console.log(getMovies());

    history.replace("/movies");
  }

  useEffect(() => {
    const movieId = match.params.id;
    console.log("movieId = ", movieId);
    if (movieId === "new" || movieId === "" || movieId === undefined) return;

    const movie = getMovie(movieId);
    if (!movie) history.replace("/not-found");

    console.log("movie=", movie);

    const existingMovie = mapMovieToObject(movie);
    setMovie(existingMovie);
  });

  function mapMovieToObject(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  return (
    <div className="container">
      {/* <h1>Movie Form {}</h1> */}

      <form onSubmit={doSubmit}>
        {renderInput("title", "Title", movie, errors, doHandle)}

        {renderSelect("genreId", "Genre", movie, errors, doHandle, genres)}

        {renderInput(
          "numberInStock",
          "Number in Stock",
          movie,
          errors,
          doHandle
        )}

        {renderInput(
          "dailyRentalRate",
          "Daily Rental Rate",
          movie,
          errors,
          doHandle
        )}

        {renderButton("Save Movie", validate(movie, schema))}
      </form>
    </div>
  );
}

export default MovieForm;
