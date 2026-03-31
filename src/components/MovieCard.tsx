import { Star, Play, Info } from "lucide-react";
import { Link } from "react-router-dom";

interface MovieCardProps {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

export default function MovieCard({ id, title, poster_path, vote_average }: MovieCardProps) {
  const imageUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Poster";

  return (
    <Link to={`/movie/${id}`} className="block relative group w-full aspect-[2/3] overflow-hidden rounded-md transition-transform duration-300 hover:scale-105 hover:z-10 shadow-lg">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <h3 className="text-sm md:text-base font-bold line-clamp-2 mb-2">{title}</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-yellow-400 text-xs md:text-sm">
            <Star className="w-3 h-3 md:w-4 md:h-4 fill-current" />
            <span>{vote_average.toFixed(1)}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white flex items-center justify-center text-black hover:bg-gray-200 transition-colors">
              <Play className="w-3 h-3 md:w-4 md:h-4 fill-current" />
            </div>
            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-500/50 flex items-center justify-center text-white hover:bg-gray-500/70 transition-colors">
              <Info className="w-3 h-3 md:w-4 md:h-4" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
