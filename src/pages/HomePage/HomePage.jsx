import { useEffect, useState } from "react";
import { getTrendingMovies } from "../../assets/tmdb-api";
import MovieList from "../../components/MovieList/MovieList";
import css from "./HomePage.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const moviesData = await getTrendingMovies();
        setMovies(moviesData);
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <main className={css.home_page_container}>
      <h2>Trending Movies</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <MovieList movies={movies} />
    </main>
  );
};

export default HomePage;
