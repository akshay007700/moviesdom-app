import { Star, Play } from "lucide-react";
import { Link } from "react-router-dom";

interface MovieCardProps {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date?: string;
}

export default function MovieCard({ id, title, poster_path, vote_average, release_date }: MovieCardProps) {
  const imageUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Poster";

  const year = release_date ? new Date(release_date).getFullYear() : "N/A";

  return (
    <Link to={`/movie/${id}`} className="block relative group w-full aspect-[2/3] overflow-hidden rounded-lg transition-all duration-300 hover:scale-105 hover:z-10 shadow-xl bg-surface">
      <img
        src={imageUrl}
        alt={title}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        referrerPolicy="no-referrer"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "https://via.placeholder.com/500x750?text=No+Poster";
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-3 md:p-4">
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-sm md:text-base font-bold line-clamp-2 mb-1 text-white">{title}</h3>
          <div className="flex items-center justify-between text-xs md:text-sm">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-yellow-400">
                <Star className="w-3 h-3 md:w-4 md:h-4 fill-current" />
                <span className="font-bold">{vote_average.toFixed(1)}</span>
              </div>
              <span className="text-gray-300">{year}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 md:w-9 md:h-9 rounded-full bg-primary flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform">
                <Play className="w-3 h-3 md:w-4 md:h-4 fill-current" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
