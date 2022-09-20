import logo from "./logo.svg";
import "./App.css";
import MoviesList from "./components/MoviesList";
import { getMovies, deleteMovie } from "./services/fakeMovieService";
import { useEffect, useState } from "react";

function App() {
  const [movies, setMovies] = useState(getMovies());
  function handleOnDelete(movieId) {
    console.log("movieId: " + movieId);
    deleteMovie(movieId);
    setMovies(getMovies());
  }

  console.log("Rendering changes: movies.length= " + movies.length);
  useEffect(() => {
    console.log("Effects: movies.length = " + movies.length);
  }, [movies]);

  console.log("Returning render: movies.length= " + movies.length);
  if (movies.length === 0) {
    return <p>Showing {movies.length} movies in the database</p>;
  } else {
    return (
      <main className="container">
        <p>Showing {movies.length} movies in the database</p>
        <MoviesList movies={movies} onDelete={handleOnDelete} />
      </main>
    );
  }
}

export default App;
