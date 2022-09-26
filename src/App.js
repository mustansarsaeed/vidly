import MoviesList from "./components/MoviesList";
import { getMovies, deleteMovie, getMovie } from "./services/fakeMovieService";
import { getGenres } from "./services/fakeGenreService";
import { useState } from "react";
import Pagination from "./components/common/pagination";
import { paginate } from "./utils/paginator";
import ListGroup from "./components/common/listgroup";
import _ from "lodash";

import "./App.css";

function App(props) {
  const [latestMovies, setMovies] = useState(getMovies());
  const [pageSize, setPageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);

  const [genres, setGenres] = useState(getGenres());
  const [currentGenre, setCurrentGenre] = useState({});
  const [sortColumn, setSortColumn] = useState({
    path: "title",
    order: "asc",
  });

  let allGenres = [{ name: "All Genres" }, ...genres];

  function getPagedData() {
    const filteredMovies =
      currentGenre && currentGenre._id
        ? latestMovies.filter((movie) => movie.genre._id === currentGenre._id)
        : latestMovies;

    const sorted = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );
    const pagedMovies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filteredMovies.length, data: pagedMovies };
  }

  function handleOnDelete(movieId) {
    deleteMovie(movieId);
    setMovies(() => getMovies());
  }

  function handleOnLike(movie) {
    let movies = getMovies();
    let index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;
    setMovies(movies);
  }

  function handlePageSize() {}

  function handleOnPageChange(page) {
    setCurrentPage(page);
  }

  function handleOnGenreChange(genre) {
    setCurrentGenre(genre);
  }

  function handleSort(sColumn) {
    setSortColumn(sColumn);
  }

  const { totalCount, data: movies } = getPagedData();
  if (latestMovies.length === 0) return <p>No movies in the database</p>;

  return (
    <main className="container row m-5">
      <div className="col-2">
        <ListGroup
          items={allGenres}
          currentItem={currentGenre}
          onItemSelected={handleOnGenreChange}
        />
      </div>
      <div className="col">
        <p>Showing {totalCount} movies in the database</p>
        <MoviesList
          movies={movies}
          onDelete={handleOnDelete}
          onLike={handleOnLike}
          onLikeClicked={handleOnLike}
          onSort={handleSort}
          sortColumn={sortColumn}
        />
        <Pagination
          itemsCount={totalCount}
          pageSize={pageSize}
          onPageChange={handleOnPageChange}
          currentPage={currentPage}
        />
      </div>
    </main>
  );
}

export default App;
