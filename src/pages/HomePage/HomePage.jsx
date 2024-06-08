import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import {fetchTrendingMovies} from "../../api/movies-api";
import css from "./HomePage.module.css";

function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    async function fetchTrending() {
      try {
        const data = await fetchTrendingMovies();
        setTrendingMovies(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchTrending();
  }, []);

  return (
    <div className={css.container}>
      <h1 className={css.heading}>Trending today</h1>
      <MovieList movies={trendingMovies} />
    </div>
  );
}

export default HomePage;
