import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import MovieGrid from "../components/MovieGrid";
import Pagination from "../components/Pagination";
import { discoverMovies, fetchGenres } from "../services/tmdb";
import { Filter, X } from "lucide-react";

export default function Movies() {
  const [movies, setMovies] = useState<any[]>([]);
  const [genres, setGenres] = useState<any[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | "">("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const years = Array.from({ length: 50 }, (_, i) => (new Date().getFullYear() - i).toString());

  useEffect(() => {
    const getGenres = async () => {
      try {
        const genresData = await fetchGenres();
        setGenres(genresData);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    getGenres();
  }, []);

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      try {
        const data = await discoverMovies({
          page: currentPage,
          with_genres: selectedGenre ? selectedGenre.toString() : undefined,
          primary_release_year: selectedYear || undefined,
        });
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, [currentPage, selectedGenre, selectedYear]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleGenreChange = (genreId: number | "") => {
    setSelectedGenre(genreId);
    setCurrentPage(1);
  };

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedGenre("");
    setSelectedYear("");
    setCurrentPage(1);
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-background text-white">
      <Helmet>
        <title>Explore Movies - MoviesDom</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 md:px-12 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-5xl font-bold">Explore Movies</h1>
            <p className="text-gray-400">Discover thousands of movies across all genres.</p>
          </div>

          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 bg-surface px-6 py-3 rounded-full font-bold hover:bg-white/10 transition-all border border-white/10"
          >
            {isFilterOpen ? <X className="w-5 h-5" /> : <Filter className="w-5 h-5" />}
            {isFilterOpen ? "Close Filters" : "Filters"}
          </button>
        </div>

        {isFilterOpen && (
          <div className="bg-surface/50 p-8 rounded-3xl border border-white/5 space-y-8 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="space-y-4">
                <label className="text-sm font-bold text-gray-500 uppercase tracking-widest">Genre</label>
                <select 
                  value={selectedGenre}
                  onChange={(e) => handleGenreChange(e.target.value ? parseInt(e.target.value) : "")}
                  className="w-full bg-background border border-white/10 rounded-xl p-3 outline-none focus:border-primary transition-colors"
                >
                  <option value="">All Genres</option>
                  {genres.map((genre) => (
                    <option key={genre.id} value={genre.id}>{genre.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold text-gray-500 uppercase tracking-widest">Release Year</label>
                <select 
                  value={selectedYear}
                  onChange={(e) => handleYearChange(e.target.value)}
                  className="w-full bg-background border border-white/10 rounded-xl p-3 outline-none focus:border-primary transition-colors"
                >
                  <option value="">All Years</option>
                  {years.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <button 
                  onClick={clearFilters}
                  className="w-full bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl font-bold transition-all border border-white/5"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-12">
          <MovieGrid movies={movies} loading={loading} />
          
          {!loading && movies.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}

          {!loading && movies.length === 0 && (
            <div className="py-20 text-center space-y-4">
              <p className="text-xl text-gray-500">No movies found matching your filters.</p>
              <button 
                onClick={clearFilters}
                className="text-primary hover:underline font-bold"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
