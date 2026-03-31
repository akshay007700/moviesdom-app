import axios from "axios";

const TMDB_API_KEY = (import.meta as any).env.VITE_TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

const tmdbApi = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
});

export const fetchTrending = async (page = 1) => {
  const response = await tmdbApi.get("/trending/movie/day", { params: { page } });
  return response.data;
};

export const fetchPopular = async (page = 1) => {
  const response = await tmdbApi.get("/movie/popular", { params: { page } });
  return response.data;
};

export const fetchTopRated = async (page = 1) => {
  const response = await tmdbApi.get("/movie/top_rated", { params: { page } });
  return response.data;
};

export const fetchUpcoming = async (page = 1) => {
  const response = await tmdbApi.get("/movie/upcoming", { params: { page } });
  return response.data;
};

export const fetchMovieDetails = async (id: string | number) => {
  const response = await tmdbApi.get(`/movie/${id}`, {
    params: { append_to_response: "videos,similar,credits" },
  });
  return response.data;
};

export const searchMovies = async (query: string, page = 1) => {
  const response = await tmdbApi.get("/search/movie", { params: { query, page } });
  return response.data;
};

export const fetchGenres = async () => {
  const response = await tmdbApi.get("/genre/movie/list");
  return response.data.genres;
};

export const discoverMovies = async (params: any) => {
  const response = await tmdbApi.get("/discover/movie", { params });
  return response.data;
};
