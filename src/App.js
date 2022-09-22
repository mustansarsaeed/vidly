import logo from "./logo.svg";
import "./App.css";
import MoviesList from "./components/MoviesList";
import { getMovies, deleteMovie, getMovie } from "./services/fakeMovieService";
import { getGenres } from "./services/fakeGenreService";
import { useEffect, useState } from "react";
import Pagination from "./components/common/pagination";
import { paginate } from "./utils/paginator";
import ListGroup from "./components/common/listgroup";
function App(props) {
  const [latestMovies, setMovies] = useState(getMovies());
  const [pageSize, setPageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);

  const [genres, setGenres] = useState(getGenres());
  const [currentGenre, setCurrentGenre] = useState({});

  let allGenres = [{ name: "All Genres" }, ...genres];
  const filteredMovies =
    currentGenre && currentGenre._id
      ? latestMovies.filter((movie) => movie.genre._id === currentGenre._id)
      : latestMovies;

  const pagedMovies = paginate(filteredMovies, currentPage, pageSize);

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
    console.log(genre);
    setCurrentGenre(genre);
  }

  if (pagedMovies.length === 0) {
    return <p>Showing {pagedMovies.length} movies in the database</p>;
  } else {
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
          <p>Showing {filteredMovies.length} movies in the database</p>
          <MoviesList
            movies={pagedMovies}
            onDelete={handleOnDelete}
            onLike={handleOnLike}
            onLikeClicked={handleOnLike}
          />
          <Pagination
            itemsCount={filteredMovies.length}
            pageSize={pageSize}
            onPageChange={handleOnPageChange}
            currentPage={currentPage}
          />
        </div>
      </main>
    );
  }
}

export default App;
