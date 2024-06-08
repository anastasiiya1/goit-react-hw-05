import { fetchMovieCast } from "../../api/movies-api.js";
import { useState, useEffect } from "react";

function MovieCast({ movieId }) {
  const [cast, setCast] = useState([]);

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
