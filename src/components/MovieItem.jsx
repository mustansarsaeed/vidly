import React, { Component } from "react";
import Like from "./common/like";
function MovieItem(props) {
  return (
    <tr>
      <td scope="col">{props.movie.title}</td>
      <td>{props.movie.genre.name}</td>
      <td>{props.movie.numberInStock}</td>
      <td>{props.movie.dailyRentalRate}</td>
      <td>
        <Like
          liked={props.movie.liked}
          onLikeClicked={() => props.onLikeClicked(props.movie)}
        />
      </td>
      <td>
        <button
          className="btn btn-danger btn-sm m-2"
          onClick={() => props.onDelete(props.movie._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default MovieItem;
