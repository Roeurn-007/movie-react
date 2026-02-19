const BASE_URL = "https://api.tvmaze.com";

const normalizeShow = (show) => ({
  id: show.id,
  title: show.name,
  release_date: show.premiered || "Unknown",
  poster_url: show.image?.original || show.image?.medium || null,
  watch_url: show.officialSite || show.url || null,
});

const fetchJson = async (url) => {
  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return data;
};

export const getPopularMovies = async (page = 0, limit = 24) => {
  const shows = await fetchJson(`${BASE_URL}/shows?page=${page}`);
  return Array.isArray(shows) ? shows.slice(0, limit).map(normalizeShow) : [];
};

export const searchMovies = async (query) => {
  const searchResults = await fetchJson(
    `${BASE_URL}/search/shows?q=${encodeURIComponent(query)}`,
  );

  return Array.isArray(searchResults)
    ? searchResults.map((item) => normalizeShow(item.show))
    : [];
};
