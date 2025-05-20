import { useEffect, useState, useRef } from "react";
import {
  useParams,
  useNavigate,
  Link,
  useLocation,
  Outlet,
} from "react-router-dom";
import { getMovieDetails } from "../../assets/tmdb-api";
import css from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  const prevLocationRef = useRef(location.state?.from || "/movies");

  useEffect(() => {
    const getMovie = async () => {
      try {
        setError(null);
        const movieData = await getMovieDetails(movieId);
        setMovie(movieData);
      } catch (err) {
        setError("Failed to fetch movie details. Please try again.");
        console.error("Error fetching movie details:", err);
      }
    };

    getMovie();
  }, [movieId]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!movie) return <main className={css.loading}>Loading...</main>;

  const handleGoBack = () => {
    navigate(prevLocationRef.current);
  };

  return (
    <main className={css.movie_details_page_container}>
      <button onClick={handleGoBack}>Go back</button>
      <h2>{movie.title}</h2>
      <div className={css.img_info_wrapper}>
        {movie.poster_path && (
          <img
            className={css.movie_img}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        )}
        <div className={css.info_text}>
          <p>
            <strong>Score:</strong> {movie.vote_average} / 10
          </p>
          <p>
            <strong>Genres:</strong>{" "}
            {movie.genres.map((genre) => genre.name).join(", ")}
          </p>
          <p>
            <strong>Overview:</strong> {movie.overview}
          </p>
        </div>
      </div>
      <div className={css.movie_info_wrapper}>
        <Link className={css.cast} to="cast">
          Cast
        </Link>
        <Link className={css.reviews} to="reviews">
          Reviews
        </Link>
      </div>
      <Outlet />
    </main>
  );
};

export default MovieDetailsPage;
