import "./css/App.css";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Favorites from "./pages/Favorites";
import Discover from "./pages/Discover";
import About from "./pages/About";
import NavBar from "./components/NavBar";
import { useEffect, useState } from "react";

function App() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem("favorites");
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch {
      setFavorites([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = (movieId) => favorites.some((movie) => movie.id === movieId);

  const toggleFavorite = (movie) => {
    setFavorites((prev) =>
      prev.some((item) => item.id === movie.id)
        ? prev.filter((item) => item.id !== movie.id)
        : [...prev, movie],
    );
  };

  return (
    <div>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={<Home onToggleFavorite={toggleFavorite} isFavorite={isFavorite} />}
          />
          <Route
            path="/favorites"
            element={
              <Favorites
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
                isFavorite={isFavorite}
              />
            }
          />
          <Route
            path="/discover"
            element={<Discover onToggleFavorite={toggleFavorite} isFavorite={isFavorite} />}
          />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
