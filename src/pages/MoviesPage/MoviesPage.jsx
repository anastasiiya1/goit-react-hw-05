import { useState } from "react";
import fetchMovies from "../../fetchMovies";
import toast from "react-hot-toast";
import css from "./MoviesPage.module.css";

function MoviesPage() {
  const path = "search/movie";
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  async function fetchMoviesByQuery(query) {
    try {
      if (query) {
        const data = await fetchMovies(`${path}?query=${query}`);
        return data.results;
      }
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  function handleOnChange(e) {
    setQuery(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!query.trim()) {
      toast.error("Search query is required");
      return;
    }
    const results = await fetchMoviesByQuery(query);

    setMovies(results);
    setQuery("");
  }

  return (
    <div className={css.container}>
      <h1>Movies Search</h1>
      <form onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Enter name of the film to search"
          value={query}
          onChange={handleOnChange}
        />
        <button className={css.btn} type="submit">
          Search
        </button>
      </form>

      <ul className={css.moviesList}>
        {movies.map((movie) => (
          <li key={movie.id} className={css.movieItem}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <div className={css.movieInfo}>
              <h2 className={css.movieTitle}>{movie.title}</h2>
              <p className={css.movieReleaseDate}>{movie.release_date}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MoviesPage;
