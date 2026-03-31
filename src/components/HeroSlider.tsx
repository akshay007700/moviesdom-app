import { Play, Info, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

interface HeroSliderProps {
  movies: any[];
}

export default function HeroSlider({ movies }: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [movies.length]);

  if (!movies.length) return null;

  const movie = movies[currentIndex];

  return (
    <div className="relative h-[60vh] md:h-[85vh] w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={movie.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/30" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 flex flex-col justify-center px-4 md:px-12 space-y-4 md:space-y-6 max-w-2xl">
        <motion.h1
          key={`title-${movie.id}`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-6xl font-bold tracking-tight drop-shadow-2xl"
        >
          {movie.title}
        </motion.h1>
        <motion.p
          key={`desc-${movie.id}`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-sm md:text-lg text-gray-200 line-clamp-3 md:line-clamp-4 drop-shadow-lg"
        >
          {movie.overview}
        </motion.p>
        <motion.div
          key={`btns-${movie.id}`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center gap-4"
        >
          <Link
            to={`/movie/${movie.id}`}
            className="flex items-center gap-2 bg-white text-black px-6 py-2 md:px-8 md:py-3 rounded-md font-bold hover:bg-gray-200 transition-colors"
          >
            <Play className="w-5 h-5 fill-current" />
            Play
          </Link>
          <Link
            to={`/movie/${movie.id}`}
            className="flex items-center gap-2 bg-gray-500/50 text-white px-6 py-2 md:px-8 md:py-3 rounded-md font-bold hover:bg-gray-500/70 transition-colors backdrop-blur-sm"
          >
            <Info className="w-5 h-5" />
            More Info
          </Link>
        </motion.div>
      </div>

      <div className="absolute bottom-10 right-10 flex items-center gap-4 z-20">
        <button
          onClick={() => setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length)}
          className="p-2 rounded-full border border-white/30 hover:bg-white/10 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => setCurrentIndex((prev) => (prev + 1) % movies.length)}
          className="p-2 rounded-full border border-white/30 hover:bg-white/10 transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
