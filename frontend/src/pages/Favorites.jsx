import MovieCard from "../components/MovieCard";
import "../css/Favorites.css";

function Favorites({ favorites, onToggleFavorite, isFavorite }) {
  if (favorites.length === 0) {
    return (
      <div className="favorites-empty">
        <h2>No Favorite Movies Yet</h2>
        <p>Start adding movies to your favorites and they will appear here.</p>
      </div>
    );
  }

  return (
    <div className="favorites">
      <h2>Your Favorites</h2>
      <div className="movies-grid">
        {favorites.map((movie) => (
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

export default Favorites;
