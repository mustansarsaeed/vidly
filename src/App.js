import logo from "./logo.svg";
import "./App.css";
import MoviesList from "./components/MoviesList";
import { getMovies, deleteMovie, getMovie } from "./services/fakeMovieService";
import { useEffect, useState } from "react";
import Pagination from "./components/common/pagination";
import { paginate } from "./utils/paginator";
function App(props) {
  const [latestMovies, setMovies] = useState(getMovies());
  const [pageSize, setPageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);

  const pagedMovies = paginate(latestMovies, currentPage, pageSize);

  function handleOnDelete(movieId) {
    deleteMovie(movieId);
    setMovies(() => getMovies());

    console.log(
      "movieId: ",
      movieId,
      " movies,length=",
      latestMovies.length,
      " getMovies.length: ",
      getMovies().length
    );
  }

  function handleOnLike(movie) {
    let movies = getMovies();
    // let fMovie = movies.filter((m) => {
    //   return m._id == movie._id;
    // })[0];
    let index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;
    setMovies(movies);
  }

  function handlePageSize() {}

  function handleOnPageChange(page) {
    setCurrentPage(page);
  }

  console.log("Returning render: movies.length= " + latestMovies.length);
  if (latestMovies.length === 0) {
    return <p>Showing {latestMovies.length} movies in the database</p>;
  } else {
    return (
      <main className="container">
        <p>Showing {pagedMovies.length} movies in the database</p>
        <MoviesList
          movies={pagedMovies}
          onDelete={handleOnDelete}
          onLike={handleOnLike}
          onLikeClicked={handleOnLike}
        />
        <Pagination
          itemsCount={latestMovies.length}
          pageSize={pageSize}
          onPageChange={handleOnPageChange}
          currentPage={currentPage}
        />
      </main>
    );
  }
}

export default App;
