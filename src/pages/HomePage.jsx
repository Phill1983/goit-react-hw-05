import MovieList from "../components/MovieList/MovieList";
import { useFetchMovies } from "../hooks/useFetchMovies";
import styles from "./HomePage.module.css";

function HomePage() {
  const { movies, loading } = useFetchMovies("/trending/movie/day");

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Trending today</h1>
      {loading ? <p>Loading...</p> : <MovieList movies={movies} />}
    </main>
  );
}

export default HomePage;
