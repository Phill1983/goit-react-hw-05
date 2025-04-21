import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;


export const getMovieDetails = async (movieId) => {
 try {
        const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
          headers: {
            Authorization: TOKEN,
          },
        });
     return response.data;

      } catch (error) {
        console.log("Error while loading details:", error.message);
    }
 };