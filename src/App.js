import logo from "./logo.svg";
import "./App.css";
import MoviesList from "./components/MoviesList";
import { getMovies, deleteMovie } from "./services/fakeMovieService";
import { useEffect, useState } from "react";

function App(props) {
  const [latestMovies, setMovies] = useState(getMovies());
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

  // console.log("Rendering changes: movies.length= " + movies.length);
  // useEffect(() => {
  //   console.log("Effects: movies.length = " + movies.length);
  // }, [movies]);

  console.log("Returning render: movies.length= " + latestMovies.length);
  if (latestMovies.length === 0) {
    return <p>Showing {latestMovies.length} movies in the database</p>;
  } else {
    return (
      <main className="container">
        <p>Showing {latestMovies.length} movies in the database</p>
        <MoviesList movies={latestMovies} onDelete={handleOnDelete} />
      </main>
    );
  }
}

export default App;
