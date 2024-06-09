import { fetchMovieCast } from "../../api/movies-api.js";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import BackLink from "../BackLink/BackLink.jsx";

function MovieCast({ movieId }) {
  const [cast, setCast] = useState([]);
  const location = useLocation();
  const goBacktoDetails = location.state?.from ?? { pathname: `/movies/${movieId}` }; 

  useEffect(() => {
    async function fetchCast() {
      try {
        const data = await fetchMovieCast(movieId);
        setCast(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCast();
  }, [movieId]);

  return (
    <div>
      <h2>Movie cast</h2>
      <BackLink to={goBacktoDetails}>Go back</BackLink>
      {cast.length === 0 ? (
        <p> No cast information available</p>
      ) : (
        <ul>
          {cast.map((actor) => (
            <li key={actor.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
              />
              <h3> {actor.name}</h3>
              <h4>Character: {actor.character}</h4>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MovieCast;
