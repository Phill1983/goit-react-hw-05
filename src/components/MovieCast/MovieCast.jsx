import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./MovieCast.module.css"

const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;
const IMG_BASE = "https://image.tmdb.org/t/p/w200";

function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    async function fetchCast() {
      try {
        const response = await axios.get(`${BASE_URL}/movie/${movieId}/credits`, {
          headers: {
            Authorization: TOKEN,
          },
        });

        setCast(response.data.cast);
        
      } catch (error) {
        console.log("Cast error:", error.message);
      } finally {
        setLoading(false); 
      }
    }

    fetchCast();
  }, [movieId]);

  if (loading) {
    return <p>Loading the cast...</p>;
  }

  if (cast.length === 0) {
    return <p>Sorry, cast information is not available right now.</p>;
  }

  return (
    <div className={styles.actorsList}>
      <ul>
        {cast.map((actor) => (
          <li key={actor.cast_id} className={styles.actorItem}>
            {actor.profile_path ? (
              <img
                src={`${IMG_BASE}${actor.profile_path}`}
                alt={actor.name}
                width="130"
              />
            ) : (
              <div className={styles.photoPlaceholder}>
                <span>No photo</span>
              </div>
            )}
            <p><strong>{actor.name}</strong></p> <p>as</p> <p>{actor.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieCast;
