import { useState, useEffect } from "react";
import axios from "axios";
import MovieGrid from "../components/MovieGrid";
import Pagination from "../components/Pagination";
import { Helmet } from "react-helmet-async";

export default function Trending() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/movies/trending", { params: { page } });
        setMovies(res.data.results);
        setTotalPages(Math.min(res.data.total_pages, 500));
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [page]);

  return (
    <div className="min-h-screen bg-black pt-24">
      <Helmet>
        <title>Trending Movies - MoviesDom</title>
      </Helmet>
      <MovieGrid title="Trending Movies 🔥" movies={movies} loading={loading} />
      {!loading && movies.length > 0 && (
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      )}
    </div>
  );
}
