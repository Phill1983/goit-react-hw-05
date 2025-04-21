import { useEffect, useState } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import MovieList from "../components/MovieList/MovieList";
import { useFetchMovies } from "../hooks/useFetchMovies";
import styles from "./MoviesPage.module.css";

function MoviesPage() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";

  const [searchValue, setSearchValue] = useState("");

  const { movies, loading } = useFetchMovies(
    `/search/movie?query=${query}&language=en-US&include_adult=false&page=1`,
    Boolean(query)
  );

  useEffect(() => {
    if (location.state?.resetInput) {
      setSearchValue("");
    
      window.history.replaceState({}, "");
    } else {
      setSearchValue(query);
    }
  }, [query, location.state]);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = searchValue.trim();
    if (trimmed === "") return;
    setSearchParams({ query: trimmed });
  };

  return (
    <main className={styles.container}>
      <h1 className={`${styles.title} ${styles.hidden}`}>Movies search</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.searchform}>
          <input
            type="text"
            name="search"
            value={searchValue}
            onChange={handleChange}
            placeholder="Type your searchquery"
            className={styles.input}
          />
          <button type="submit" className={styles.button}>Search</button>
        </div>
      </form>

      {loading && query && <p>Loading...</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </main>
  );
}

export default MoviesPage;
