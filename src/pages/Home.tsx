import { useState, useEffect } from "react";
import HeroSlider from "../components/HeroSlider";
import MovieGrid from "../components/MovieGrid";
import Pagination from "../components/Pagination";
import { Helmet } from "react-helmet-async";
import { fetchTrending, fetchPopular, fetchTopRated, fetchUpcoming, discoverMovies } from "../services/tmdb";

export default function Home() {
  const [heroMovies, setHeroMovies] = useState<any[]>([]);
  const [sections, setSections] = useState<any>({
    trending: [],
    popular: [],
    topRated: [],
    upcoming: [],
  });
  const [exploreMovies, setExploreMovies] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [gridLoading, setGridLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [trending, popular, topRated, upcoming, discover] = await Promise.all([
          fetchTrending(),
          fetchPopular(),
          fetchTopRated(),
          fetchUpcoming(),
          discoverMovies({ page: 1 }),
        ]);

        setHeroMovies(trending.results.slice(0, 5));
        setSections({
          trending: trending.results.slice(0, 10),
          popular: popular.results.slice(0, 10),
          topRated: topRated.results.slice(0, 10),
          upcoming: upcoming.results.slice(0, 10),
        });
        setExploreMovies(discover.results);
        setTotalPages(discover.total_pages);
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
      const data = await discoverMovies({ page });
      setExploreMovies(data.results);
      const element = document.getElementById("explore");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
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
    <div className="pb-20 bg-background min-h-screen">
      <Helmet>
        <title>MoviesDom - Discover Your Favorite Movies</title>
        <meta name="description" content="MoviesDom is your ultimate destination for movie discovery, trailers, and OTT redirects." />
      </Helmet>

      <HeroSlider movies={heroMovies} />

      <div className="relative z-10 -mt-16 md:-mt-32 space-y-16">
        <section className="space-y-8">
          <h2 className="px-4 md:px-12 text-2xl md:text-4xl font-bold flex items-center gap-3">
            Top 10 Today <span className="text-primary">🔥</span>
          </h2>
          <MovieGrid movies={sections.trending} />
        </section>

        <section className="space-y-8">
          <h2 className="px-4 md:px-12 text-2xl md:text-4xl font-bold">Trending Now</h2>
          <MovieGrid movies={sections.trending} />
        </section>

        <section className="space-y-8">
          <h2 className="px-4 md:px-12 text-2xl md:text-4xl font-bold">Popular Movies</h2>
          <MovieGrid movies={sections.popular} />
        </section>

        <section className="space-y-8">
          <h2 className="px-4 md:px-12 text-2xl md:text-4xl font-bold">Top Rated</h2>
          <MovieGrid movies={sections.topRated} />
        </section>

        <section className="space-y-8">
          <h2 className="px-4 md:px-12 text-2xl md:text-4xl font-bold">New Releases</h2>
          <MovieGrid movies={sections.upcoming} />
        </section>

        <section id="explore" className="pt-12 space-y-8">
          <div className="px-4 md:px-12 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-2xl md:text-4xl font-bold">Explore All Movies</h2>
          </div>
          
          <MovieGrid movies={exploreMovies} loading={gridLoading} />
          
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </section>
      </div>
    </div>
  );
}
