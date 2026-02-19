import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import "../css/Home.css";
import { getPopularMovies } from "../services/api";

function Discover({ onToggleFavorite, isFavorite }) {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMoreShows = async () => {
      try {
        setLoading(true);
        setError(null);
        const popularMovies = await getPopularMovies(1);
        setMovies(popularMovies);
      } catch {
        setError("Failed to load discover page.");
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    loadMoreShows();
  }, []);

  return (
    <div className="home">
      <h2>Discover</h2>
      {loading && <p>Loading shows...</p>}
      {error && <p>{error}</p>}

      <div className="movies-grid">
        {!loading &&
          !error &&
          movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onToggleFavorite={onToggleFavorite}
              isFavorite={isFavorite(movie.id)}
            />
          ))}
      </div>
    </div>
  );
}

export default Discover;
