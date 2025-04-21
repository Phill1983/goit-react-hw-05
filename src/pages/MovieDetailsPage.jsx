import { useEffect, useState, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { getMovieDetails } from "../Api/movieApi";
import MovieContent from "../components/MovieDetails/MovieContent";

function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const fromRef = useRef(location.state?.from ?? "/movies");

const goBack = (e) => {
  e?.preventDefault?.();
  navigate(fromRef.current, { state: { resetInput: true } });
};

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const response = await getMovieDetails(movieId);
        setMovie(response);
      } catch (error) {
        console.log("Error while loading details:", error.message);
      }
    }

    fetchMovieDetails();
  }, [movieId]);

  return (
    <main>
      {!movie ? (
        <p>Loading...</p>
      ) : (
        <MovieContent movie={movie} goBack={goBack} from={fromRef.current} />
      )}
    </main>
  );
}

export default MovieDetailsPage;