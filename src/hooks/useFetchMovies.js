import { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export function useFetchMovies(url, enabled = true) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!enabled) return;

    async function fetchData() {
      try {
        const response = await axios.get(`${BASE_URL}${url}`, {
          headers: {
            Authorization: TOKEN,
          },
        });

        setMovies(response.data.results);
      } catch (error) {
        console.log("❌ useFetchMovies error:", error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [url, enabled]);

  return { movies, loading };
}
