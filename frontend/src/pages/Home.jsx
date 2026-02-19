import { useEffect, useRef, useState } from "react";
import MovieCard from "../components/MovieCard";
import "../css/Home.css";
import { getPopularMovies, searchMovies } from "../services/api";

function Home({ onToggleFavorite, isFavorite }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const hasInitializedSearch = useRef(false);

  const loadPopularMovies = async ({ page = 0, append = false } = {}) => {
    try {
      if (append) {
        setIsLoadingMore(true);
      } else {
        setLoading(true);
      }

      setError(null);
      const popularMovies = await getPopularMovies(page);

      setMovies((prev) => {
        if (!append) return popularMovies;
        const existingIds = new Set(prev.map((movie) => movie.id));
        const uniqueNewMovies = popularMovies.filter((movie) => !existingIds.has(movie.id));
        return [...prev, ...uniqueNewMovies];
      });
      setCurrentPage(page);
    } catch {
      setError("Failed to load shows. Please try again.");
      if (!append) setMovies([]);
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    loadPopularMovies({ page: 0 });
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    const query = searchQuery.trim();

    if (!query) {
      loadPopularMovies({ page: 0, append: false });
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const results = await searchMovies(query);
      setMovies(results);
    } catch {
      setError("Search failed. Please try again.");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (loading || isLoadingMore || searchQuery.trim()) return;
    loadPopularMovies({ page: currentPage + 1, append: true });
  };

  useEffect(() => {
    if (!hasInitializedSearch.current) {
      hasInitializedSearch.current = true;
      return;
    }

    const timer = setTimeout(async () => {
      const query = searchQuery.trim();

      if (!query) {
        loadPopularMovies({ page: 0, append: false });
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const results = await searchMovies(query);
        setMovies(results);
      } catch {
        setError("Search failed. Please try again.");
        setMovies([]);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          className="search-input"
          placeholder="Search for movies.."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {loading && <p>Loading movies...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && movies.length === 0 && <p>No results found.</p>}

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

      {!searchQuery.trim() && !error && movies.length > 0 && (
        <div className="load-more-wrap">
          <button
            type="button"
            className="load-more-btn"
            onClick={handleLoadMore}
            disabled={isLoadingMore}
          >
            {isLoadingMore ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
