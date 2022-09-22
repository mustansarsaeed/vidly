import React, { Component } from "react";
import Like from "./common/like";
import Table from "./common/table";

function MoviesList(props) {
  const columns = [
    {
      label: "Title",
      path: "title",
    },
    {
      label: "Genre",
      path: "genre.name",
    },
    {
      label: "Stock",
      path: "numberInStock",
    },
    {
      label: "Rate",
      path: "dailyRentalRate",
    },
    {
      key: "like",
      content: (movie) => (
        <Like
          liked={movie.liked}
          onLikeClicked={() => props.onLikeClicked(movie)}
        />
      ),
    },
    {
      key: "delete",
      content: (movie) => (
        <button
          className="btn btn-danger btn-sm m-2"
          onClick={() => props.onDelete(movie._id)}
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      onSort={props.onSort}
      sortColumn={props.sortColumn}
      data={props.movies}
    />
  );
}

export default MoviesList;
