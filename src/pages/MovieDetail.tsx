import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Star, ExternalLink, Calendar, Globe, Languages, Play } from "lucide-react";
import MovieGrid from "../components/MovieGrid";
import { Helmet } from "react-helmet-async";
import { fetchMovieDetails } from "../services/tmdb";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovieDetails = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await fetchMovieDetails(parseInt(id));
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    getMovieDetails();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!movie) return <div className="h-screen flex items-center justify-center text-white">Movie not found</div>;

  const trailer = movie.videos?.results?.find((v: any) => v.type === "Trailer" || v.type === "Teaser");
  const similarMovies = movie.similar?.results || [];
  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A";

  return (
    <div className="pb-20 bg-background min-h-screen text-white">
      <Helmet>
        <title>{`${movie.title} (${year}) - MoviesDom`}</title>
        <meta name="description" content={movie.overview} />
      </Helmet>

      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className="w-full h-full object-cover scale-105 blur-[2px] opacity-40"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        
        <div className="absolute inset-0 flex items-center justify-center px-4 md:px-12">
          <div className="max-w-7xl w-full flex flex-col md:flex-row gap-8 items-center md:items-end pb-12 md:pb-24">
            {/* Poster */}
            <div className="w-48 md:w-80 flex-shrink-0 rounded-xl overflow-hidden shadow-2xl border border-white/10 transform hover:scale-105 transition-transform duration-500">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Quick Info */}
            <div className="flex-1 space-y-6 text-center md:text-left">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight">{movie.title}</h1>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm md:text-lg text-gray-300 font-medium">
                  <div className="flex items-center gap-2 text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded-full border border-yellow-400/20">
                    <Star className="w-5 h-5 fill-current" />
                    <span className="font-bold">{movie.vote_average.toFixed(1)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span>{year}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Languages className="w-5 h-5 text-primary" />
                    <span>{movie.original_language.toUpperCase()}</span>
                  </div>
                  <div className="hidden md:flex items-center gap-2">
                    <Globe className="w-5 h-5 text-primary" />
                    <span>{movie.origin_country?.[0] || "N/A"}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                {movie.genres.map((genre: any) => (
                  <span key={genre.id} className="px-4 py-1.5 bg-surface/80 backdrop-blur-sm border border-white/10 rounded-full text-xs md:text-sm font-semibold hover:bg-primary/20 transition-colors cursor-default">
                    {genre.name}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
                {trailer && (
                  <button 
                    onClick={() => document.getElementById('trailer')?.scrollIntoView({ behavior: 'smooth' })}
                    className="flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-primary/90 transition-all shadow-lg hover:scale-105 active:scale-95"
                  >
                    <Play className="w-5 h-5 fill-current" /> Play Trailer
                  </button>
                )}
                <button className="flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-8 py-3 rounded-full font-bold hover:bg-white/20 transition-all border border-white/20">
                  Add to List
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-12 space-y-24 mt-12">
        {/* Watch Section */}
        <div className="space-y-8">
          <h3 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
            <div className="w-2 h-8 bg-primary rounded-full" />
            Watch Now On
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <a
              href={`https://www.netflix.com/search?q=${encodeURIComponent(movie.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between bg-[#E50914]/10 border border-[#E50914]/30 p-6 rounded-2xl hover:bg-[#E50914]/20 transition-all group"
            >
              <span className="text-xl font-bold text-[#E50914]">Netflix</span>
              <ExternalLink className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
            <a
              href={`https://www.amazon.com/s?k=${encodeURIComponent(movie.title)}+movie`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between bg-[#00A8E1]/10 border border-[#00A8E1]/30 p-6 rounded-2xl hover:bg-[#00A8E1]/20 transition-all group"
            >
              <span className="text-xl font-bold text-[#00A8E1]">Prime Video</span>
              <ExternalLink className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
            <a
              href={`https://www.hotstar.com/in/search?q=${encodeURIComponent(movie.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between bg-[#002144]/10 border border-[#002144]/30 p-6 rounded-2xl hover:bg-[#002144]/20 transition-all group"
            >
              <span className="text-xl font-bold text-[#002144]">Disney+ Hotstar</span>
              <ExternalLink className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
              <div className="w-2 h-8 bg-primary rounded-full" />
              Storyline
            </h3>
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-medium">
              {movie.overview || "No description available for this movie."}
            </p>
          </div>
          
          <div className="space-y-6 bg-surface/50 p-8 rounded-3xl border border-white/5">
            <h4 className="text-xl font-bold text-primary">Movie Details</h4>
            <div className="space-y-4 text-sm md:text-base">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-gray-500">Status</span>
                <span className="font-semibold">{movie.status}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-gray-500">Runtime</span>
                <span className="font-semibold">{movie.runtime} min</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-gray-500">Budget</span>
                <span className="font-semibold">${movie.budget?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-gray-500">Revenue</span>
                <span className="font-semibold">${movie.revenue?.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Trailer Section */}
        {trailer && (
          <div id="trailer" className="space-y-8">
            <h3 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
              <div className="w-2 h-8 bg-primary rounded-full" />
              Official Trailer
            </h3>
            <div className="aspect-video w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}?autoplay=0&rel=0`}
                title={`${movie.title} Trailer`}
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* Related Movies */}
        {similarMovies.length > 0 && (
          <div className="space-y-8">
            <h3 className="text-2xl md:text-3xl font-bold flex items-center gap-3 px-4 md:px-0">
              <div className="w-2 h-8 bg-primary rounded-full" />
              You Might Also Like
            </h3>
            <MovieGrid movies={similarMovies.slice(0, 12)} />
          </div>
        )}
      </div>
    </div>
  );
}
