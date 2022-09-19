import logo from "./logo.svg";
import "./App.css";
import MoviesList from "./components/MoviesList";
import { getMovies, deleteMovie } from "./services/fakeMovieService";
import { useState } from "react";

function App() {
  const [movies, setMovies] = useState(getMovies());
  function handleOnDelete(movieId) {
    console.log("movieId: " + movieId);
    deleteMovie(movieId);
    setMovies(getMovies());
  }

  return (
    <main className="container">
      <p>Showing {getMovies().length} movies in the database</p>
      <MoviesList movies={getMovies()} onDelete={handleOnDelete} />
    </main>
  );
}

export default App;
