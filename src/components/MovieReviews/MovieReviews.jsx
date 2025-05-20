import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../assets/tmdb-api";
import css from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getReviews = async () => {
      try {
        setError(null);
        const reviewsData = await getMovieReviews(movieId);
        setReviews(reviewsData);
      } catch (err) {
        setError("Failed to load reviews. Please try again.");
        console.error("Error fetching movie reviews:", err);
      }
    };

    getReviews();
  }, [movieId]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (reviews.length === 0) return <p>No reviews available.</p>;

  return (
    <div className={css.reviews_container}>
      <h2>Reviews</h2>
      <ul className={css.reviews_list}>
        {reviews.map((review) => (
          <li key={review.id} className={css.review_item}>
            <h3>{review.author}</h3>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
