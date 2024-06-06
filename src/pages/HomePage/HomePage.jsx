import { useEffect, useState } from "react";
import MovieList from '../../components/MovieList/MovieList'
// import MovieDetailsPage from "../MovieDetailsPage/MovieDetailsPage";
import fetchMovies from "../../fetchMovies";
import css from './HomePage.module.css';

function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    async function fetchTrending() {
      const path = 'trending/movie/day';
      try {
        const data = await fetchMovies(path);
        setTrendingMovies(data.results);
      } catch (error) {
        console.log(error);
      }
    }
    fetchTrending();
  }, []);

  function openDetails(){
    console.log("ok");


  }

  return (
    <div className={css.container}>
      <h1 className={css.heading}>Trending today</h1>
      <MovieList movies={trendingMovies} onMovieClick={openDetails}
      />
    </div>
  );
}

export default HomePage;
