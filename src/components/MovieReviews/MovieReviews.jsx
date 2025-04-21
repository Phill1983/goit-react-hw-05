import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./MovieReviews.module.css";

const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await axios.get(`${BASE_URL}/movie/${movieId}/reviews`, {
          headers: {
            Authorization: TOKEN,
          },
        });

        setReviews(response.data.results);
      } catch (error) {
        console.log("Reviews error:", error.message);
      } finally {
        setLoading(false); 
      }
    }

    fetchReviews();
  }, [movieId]);

  if (loading) {
    return <p>Loading reviews...</p>;
  }

  if (reviews.length === 0) {
    return <p>No reviews so far.</p>;
  }

  return (
    <ul className={styles.reviewsList}>
      {reviews.map((review) => (
        <li key={review.id} className={styles.reviewItem}>
          <h4>Author: {review.author}</h4>
          <p>{review.content}</p>
        </li>
      ))}
    </ul>
  );
}

export default MovieReviews;
