import { useEffect, useState } from "react";
import { fetchMovieDetails } from "../../api/movies-api";
import { Routes, Route, useLocation, useParams, NavLink } from "react-router-dom";
import { BackLink } from "../../components/BackLink/BackLink";
import css from "./MovieDetailsPage.module.css";
import MovieCast from "../../components/MovieCast/MovieCast";
import MovieReviews from "../../components/MovieReviews/MovieReviews";
import clsx from 'clsx';

const getClassName = ( {isActive}) =>{
  return clsx(css.link, isActive && css.isActive)

}

function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const [selectedMovie, setSelectedMovie] = useState(
    location.state?.movie ?? ""
  );
  const goBack = location.state ?? "/movies";

  function MovieCastWrapper({ movieId }) {
    return <MovieCast movieId={movieId} />;
  }

  function MovieReviewsWrapper({ movieId }) {
    return <MovieReviews movieId={movieId} />;
  }

  useEffect(() => {
    async function fetchDetails() {
      try {
        const { data } = await fetchMovieDetails(movieId);
        setSelectedMovie(data);
      } catch (error) {
        alert("Error fetching movie details:");
      }
    }

    if (!selectedMovie) {
      fetchDetails();
    }
  }, [movieId, selectedMovie]);

  if (!selectedMovie) {
    return <div className={css.container}>Loading...</div>;
  }

  return (
    <div className={css.container}>
      <BackLink to={goBack} className={getClassName}>
        Go back
      </BackLink>
      <div className={css.movieDetails}>
        <img
          src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
          alt={selectedMovie.title}
          className={css.moviePoster}
        />
        <h2 className={css.movieTitle}>{selectedMovie.title}</h2>
        <p className={css.movieOverview}>{selectedMovie.overview}</p>
      </div>
      <div>
        <nav className={css.navbar}>
          <NavLink className={getClassName} to="cast"> Cast</NavLink>
          <NavLink className={getClassName} to="reviews">Reviews</NavLink>
        </nav>
        <Routes>
          <Route path="cast" element={<MovieCastWrapper movieId={movieId} />} />
          <Route
            path="reviews"
            element={<MovieReviewsWrapper movieId={movieId} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default MovieDetailsPage;
