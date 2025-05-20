import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../../assets/tmdb-api";
import MovieList from "../../components/MovieList/MovieList";
import css from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      try {
        setError(null);
        const moviesData = await searchMovies(query);
        setMovies(moviesData);
      } catch (err) {
        setError("Failed to fetch movies. Please try again.");
        console.error("Error fetching movies:", err);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchValue = e.target.elements.query.value.trim();

    if (!searchValue) {
      setError("Please enter a movie name");
      return;
    }

    setSearchParams({ query: searchValue });
  };

  return (
    <main className={css.movies_page_container}>
      <h2>Search Movies</h2>
      <form className={css.search_form} onSubmit={handleSearch}>
        <input
          type="text"
          name="query"
          defaultValue={query}
          placeholder="Search for a movie"
        />
        <button type="submit">Search</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <MovieList movies={movies} />
    </main>
  );
};

export default MoviesPage;
