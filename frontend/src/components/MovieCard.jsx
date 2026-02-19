import "../css/MovieCard.css";

function MovieCard({ movie, onToggleFavorite, isFavorite = false }) {
  const posterUrl = movie.poster_url
    ? movie.poster_url
    : "https://via.placeholder.com/500x750?text=No+Image";
  const watchUrl = movie.watch_url;

  function handleFavoriteClick() {
    if (onToggleFavorite) {
      onToggleFavorite(movie);
    }
  }

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img src={posterUrl} alt={movie.title} />
        <div className="movie-overlay">
          <button
            className={`favorite-btn ${isFavorite ? "active" : ""}`}
            onClick={handleFavoriteClick}
            type="button"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite ? "\u2665" : "\u2661"}
          </button>

          {watchUrl && (
            <a
              className="watch-btn"
              href={watchUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`Watch ${movie.title}`}
            >
              Watch
            </a>
          )}
        </div>
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.release_date}</p>
      </div>
    </div>
  );
}

export default MovieCard;
