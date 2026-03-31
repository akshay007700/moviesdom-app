import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import MovieCard from "./MovieCard";

interface MovieRowProps {
  title: string;
  movies: any[];
  isTop10?: boolean;
}

export default function MovieRow({ title, movies, isTop10 = false }: MovieRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);

  const handleClick = (direction: "left" | "right") => {
    setIsMoved(true);
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-2 md:space-y-4 px-4 md:px-12 py-4 md:py-8 group">
      <h2 className="text-lg md:text-2xl font-bold flex items-center gap-2">
        {title} {isTop10 && <span className="text-primary">🔥</span>}
      </h2>
      <div className="relative">
        <ChevronLeft
          className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-12 w-12 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${!isMoved && "hidden"}`}
          onClick={() => handleClick("left")}
        />
        <div
          ref={rowRef}
          className="flex items-center gap-2 md:gap-4 overflow-x-scroll scrollbar-hide scroll-smooth"
        >
          {movies.map((movie, index) => (
            <div key={movie.id} className="relative">
              {isTop10 && (
                <div className="absolute -left-4 bottom-0 z-10 text-8xl md:text-[12rem] font-black text-black/50 stroke-white stroke-2 select-none pointer-events-none drop-shadow-2xl">
                  {index + 1}
                </div>
              )}
              <div className={`${isTop10 ? "ml-12 md:ml-24" : ""} w-[160px] md:w-[220px] lg:w-[260px] flex-shrink-0`}>
                <MovieCard
                  id={movie.id}
                  title={movie.title}
                  poster_path={movie.poster_path}
                  vote_average={movie.vote_average}
                />
              </div>
            </div>
          ))}
        </div>
        <ChevronRight
          className="absolute top-0 bottom-0 right-2 z-40 m-auto h-12 w-12 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100"
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
}
