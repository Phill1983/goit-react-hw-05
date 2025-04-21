import { Link, Outlet } from "react-router-dom";
import { Suspense } from "react";
import styles from "./MovieDetailsPage.module.css";

const IMG_BASE = "https://image.tmdb.org/t/p/w500";

function MovieContent({ movie, goBack, from }) {
  const { title, overview, genres, poster_path, vote_average } = movie;

  return (
    <>
      <Link to="" onClick={goBack} className={styles.goback}>← Go back</Link>

      <div className={styles.detailsWrapper}>
        {poster_path && (
          <img
            src={`${IMG_BASE}${poster_path}`}
            alt={title}
            width="200"
            loading="lazy"
          />
        )}
        <div>
          <h2>{title}</h2>
          <p>Rating: {vote_average}</p>
          <h3>Overview</h3>
          <p>{overview}</p>
          <h3>Genres</h3>
          <p>{genres.map((g) => g.name).join(", ")}</p>
        </div>
      </div>

      <hr />

      <div className={styles.addinfoWrapper}>
        <h3>Additional information</h3>
        <ul>
          <li>
            <Link to="cast" state={{ from }}>Cast</Link>
          </li>
          <li>
            <Link to="reviews" state={{ from }}>Reviews</Link>
          </li>
        </ul>
      </div>

      <hr />

      <Suspense fallback={<p>Loading more details...</p>}>
        <Outlet />
      </Suspense>
    </>
  );
}

export default MovieContent;