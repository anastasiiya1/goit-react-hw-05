import { useEffect, useState } from "react";
import { fetchMovieReviews } from "../../api/movies-api";
import FormattedDate from "../FormattedDate/FormattedDate";
import css from "./MovieReviews.module.css";

function MovieReviews({ movieId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const data = await fetchMovieReviews(movieId);
        setReviews(data);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    }
    fetchReviews();
  }, [movieId]);

  return (
    <div className={css.container}>
      <h2>Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews available for this movie.</p>
      ) : (
        <ul className={css.reviewsList}>
          {reviews.map((review) => (
            <li key={review.id} className={css.reviewItem}>
              <h3>Author: {review.author}</h3>
              {review.author_details.rating && (
                <p>Author`s rating: {review.author_details.rating}</p>
              )}
              <p>{review.content}</p>
              <p>Updated: <FormattedDate isoDate={review.updated_at} /></p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MovieReviews;