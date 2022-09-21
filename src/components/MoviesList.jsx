import React, { Component } from "react";
import MovieItem from "./MovieItem";

function MoviesList(props) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Genre</th>
          <th scope="col">Stock</th>
          <th scope="col">Rate</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {props.movies.map((movie) => {
          return (
            <MovieItem
              key={movie.key}
              id={movie._id}
              movie={movie}
              onDelete={props.onDelete}
            />
          );
        })}
      </tbody>
    </table>
  );
}

export default MoviesList;
