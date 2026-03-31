import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Star, Play, X, Calendar, Globe, Languages } from "lucide-react";
import { Helmet } from "react-helmet-async";
import MovieGrid from "../components/MovieGrid";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/movie/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-black">
        <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!movie) return <div className="h-screen flex items-center justify-center">Movie not found</div>;

  const trailer = movie.videos.find((v: any) => v.type === "Trailer" || v.type === "Teaser");

  return (
    <div className="min-h-screen bg-black pb-20">
      <Helmet>
        <title>{`${movie.title} (${new Date(movie.release_date).getFullYear()}) - MoviesDom`}</title>
        <meta name="description" content={movie.overview} />
      </Helmet>

      {/* Hero Section */}
      <div className="relative h-[60vh] w-full">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className="w-full h-full object-cover opacity-40"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-12 -mt-64 relative z-10">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Poster */}
          <div className="w-64 md:w-80 flex-shrink-0 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Info */}
          <div className="flex-1 space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">{movie.title}</h1>
              <div className="flex flex-wrap items-center gap-6 text-zinc-400">
                <div className="flex items-center gap-2 text-yellow-500">
                  <Star className="w-6 h-6 fill-current" />
                  <span className="text-xl font-bold text-white">{movie.vote_average.toFixed(1)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{new Date(movie.release_date).getFullYear()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  <span>{movie.origin_country?.[0] || "N/A"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Languages className="w-5 h-5" />
                  <span>{movie.original_language.toUpperCase()}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {movie.genres.map((genre: any) => (
                <span key={genre.id} className="px-4 py-1.5 bg-zinc-800 rounded-full text-sm font-medium text-white ring-1 ring-white/5">
                  {genre.name}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              {trailer && (
                <button
                  onClick={() => setShowTrailer(true)}
                  className="flex items-center gap-3 px-10 py-4 rounded-full bg-red-600 text-white font-bold hover:bg-red-700 transition-all hover:scale-105 shadow-xl shadow-red-600/20"
                >
                  <Play className="w-6 h-6 fill-current" />
                  Watch Trailer
                </button>
              )}
            </div>

            <div className="space-y-8">
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-white border-l-4 border-red-600 pl-4">Storyline (English)</h3>
                <p className="text-zinc-300 text-lg leading-relaxed max-w-4xl">{movie.overview}</p>
              </div>

              {movie.description_hi && movie.description_hi !== "हिंदी विवरण उपलब्ध नहीं है।" && (
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-white border-l-4 border-red-600 pl-4">कहानी (Hindi)</h3>
                  <p className="text-zinc-300 text-lg leading-relaxed max-w-4xl">{movie.description_hi}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Movies */}
        {movie.similar && movie.similar.length > 0 && (
          <div className="mt-24">
            <MovieGrid title="Related Movies" movies={movie.similar.slice(0, 12)} />
          </div>
        )}
      </div>

      {/* Trailer Modal */}
      {showTrailer && trailer && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10">
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute top-6 right-6 z-10 p-3 rounded-full bg-black/60 text-white hover:bg-red-600 transition-all hover:scale-110"
            >
              <X className="w-6 h-6" />
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
              title="Movie Trailer"
              className="w-full h-full"
              allowFullScreen
              allow="autoplay"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}
