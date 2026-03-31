import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // Helper to fetch from TMDB
  const fetchTMDB = async (endpoint: string, params: any = {}) => {
    try {
      const response = await axios.get(`${TMDB_BASE_URL}${endpoint}`, {
        params: {
          api_key: TMDB_API_KEY,
          ...params,
        },
      });
      return response.data;
    } catch (error: any) {
      console.error(`TMDB Error (${endpoint}):`, error.response?.data || error.message);
      throw error;
    }
  };

  // API Routes
  app.get("/api/movies/popular", async (req, res) => {
    try {
      const data = await fetchTMDB("/movie/popular");
      res.json(data.results);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch popular movies" });
    }
  });

  app.get("/api/movies/trending", async (req, res) => {
    try {
      const data = await fetchTMDB("/trending/movie/day");
      res.json(data.results);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch trending movies" });
    }
  });

  app.get("/api/movies/top-rated", async (req, res) => {
    try {
      const data = await fetchTMDB("/movie/top_rated");
      res.json(data.results);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch top rated movies" });
    }
  });

  app.get("/api/movies/discover", async (req, res) => {
    const { page = 1 } = req.query;
    try {
      const data = await fetchTMDB("/discover/movie", { page });
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to discover movies" });
    }
  });

  app.get("/api/movie/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const [movieData, videos, similar] = await Promise.all([
        fetchTMDB(`/movie/${id}`),
        fetchTMDB(`/movie/${id}/videos`),
        fetchTMDB(`/movie/${id}/similar`),
      ]);

      res.json({
        ...movieData,
        videos: videos.results,
        similar: similar.results,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch movie details" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
