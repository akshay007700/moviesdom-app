import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import MovieGrid from "../components/MovieGrid";
import Pagination from "../components/Pagination";
import { searchMovies } from "../services/tmdb";

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [movies, setMovies] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const performSearch = async () => {
      if (!query) return;
      setLoading(true);
      try {
        const data = await searchMovies(query, 1);
        setMovies(data.results);
        setTotalPages(data.total_pages);
        setCurrentPage(1);
      } catch (error) {
        console.error("Error searching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    performSearch();
  }, [query]);

  const handlePageChange = async (page: number) => {
    setLoading(true);
    setCurrentPage(page);
    try {
      const data = await searchMovies(query, page);
      setMovies(data.results);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Error fetching paginated search results:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-background">
      <Helmet>
        <title>{query ? `Search results for "${query}" - MoviesDom` : "Search Movies - MoviesDom"}</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 md:px-12 space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-5xl font-bold">
            {query ? `Search results for "${query}"` : "Search Movies"}
          </h1>
          {movies.length > 0 && (
            <p className="text-gray-400">Found {movies.length} movies on this page</p>
          )}
        </div>

        {movies.length === 0 && !loading ? (
          <div className="py-20 text-center space-y-4">
            <p className="text-xl text-gray-500">No movies found matching your search.</p>
            <button 
              onClick={() => window.history.back()}
              className="text-primary hover:underline font-bold"
            >
              Go Back
            </button>
          </div>
        ) : (
          <>
            <MovieGrid movies={movies} loading={loading} />
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
