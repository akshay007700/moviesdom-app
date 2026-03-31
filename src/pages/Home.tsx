import { useState, useEffect } from "react";
import axios from "axios";
import HeroSlider from "../components/HeroSlider";
import MovieRow from "../components/MovieRow";
import MovieGrid from "../components/MovieGrid";
import Pagination from "../components/Pagination";
import { Helmet } from "react-helmet-async";

export default function Home() {
  const [movies, setMovies] = useState<any>({
    trending: [],
    popular: [],
    topRated: [],
  });
  const [discoverMovies, setDiscoverMovies] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [gridLoading, setGridLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          trending,
          popular,
          topRated,
          discover,
        ] = await Promise.all([
          axios.get("/api/movies/trending"),
          axios.get("/api/movies/popular"),
          axios.get("/api/movies/top-rated"),
          axios.get("/api/movies/discover?page=1"),
        ]);

        setMovies({
          trending: trending.data,
          popular: popular.data,
          topRated: topRated.data,
        });
        setDiscoverMovies(discover.data.results);
        setTotalPages(discover.data.total_pages);
      } catch (error) {
        console.error("Error fetching home data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePageChange = async (page: number) => {
    setGridLoading(true);
    setCurrentPage(page);
    try {
      const response = await axios.get(`/api/movies/discover?page=${page}`);
      setDiscoverMovies(response.data.results);
      window.scrollTo({ top: document.getElementById("explore")?.offsetTop || 0, behavior: "smooth" });
    } catch (error) {
      console.error("Error fetching paginated movies:", error);
    } finally {
      setGridLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="pb-20">
      <Helmet>
        <title>MoviesDom - Discover Your Favorite Movies</title>
        <meta name="description" content="MoviesDom is your ultimate destination for movie discovery, trailers, and OTT redirects." />
      </Helmet>

      <HeroSlider movies={movies.trending.slice(0, 5)} />

      <div className="relative z-10 -mt-16 md:-mt-32 space-y-4">
        <MovieRow title="Top 10 Today" movies={movies.trending.slice(0, 10)} isTop10 />
        <MovieRow title="Trending Now" movies={movies.trending} />
        <MovieRow title="Popular Movies" movies={movies.popular} />
        <MovieRow title="Top Rated" movies={movies.topRated} />

        <div id="explore" className="pt-12">
          <h2 className="px-4 md:px-12 text-2xl md:text-3xl font-bold mb-8">Explore All Movies</h2>
          {gridLoading ? (
            <div className="h-40 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <>
              <MovieGrid movies={discoverMovies} />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
