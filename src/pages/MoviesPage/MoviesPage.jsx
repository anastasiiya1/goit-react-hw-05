import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { fetchMoviesByQuery } from "../../api/movies-api";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import toast from "react-hot-toast";
import css from "./MoviesPage.module.css";
import { useSearchParams } from "react-router-dom";

function MoviesPage() {
  const [query, setQuery] = useState("");
  const [userQuery, setUserQuery] = useState("");
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState(false);
  const [params, setParams] = useSearchParams();
  
  useEffect(() => {
    if (!userQuery) {
      return;
    }
    const getMovies = async () => {
      setIsLoading(true);
      setError(false);

      try {
        const { data } = await fetchMoviesByQuery(userQuery, page);
        setSearchedMovies((prev) => [...prev, ...data.results]);
        setIsVisible(true);
      } catch (error) {
        setError(true);
        toast.error("Error fetching movies, try again");
      } finally {
        setIsLoading(false);
        setQuery("");
      }
    };
    getMovies();
  }, [userQuery, page]);

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!query.trim()) {
      toast.error("Search query is required");
      return;
    }

    setUserQuery(query);
    setPage(1);
  };

  const handleOnChange = (e) => {
    const value = e.target.value;

    setQuery(value);
    params.set("search", value);
    setParams(params);
  };

  return (
    <>
      <h1>Movies Search</h1>
      <form onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Enter name of the film to search"
          value={query ?? ""}
          onChange={handleOnChange}
        />
        <button className={css.btn} type="submit">
          Search
        </button>
      </form>

      {isLoading && <p>Loading..</p>}
      {error && <p>Error loading movies</p>}

      <MovieList movies={searchedMovies} />
      {isVisible && <LoadMoreBtn onClick={handleLoadMore} />}
    </>
  );
}

export default MoviesPage;
