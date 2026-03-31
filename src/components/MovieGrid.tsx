import MovieCard from "./MovieCard";

interface MovieGridProps {
  movies: any[];
  loading?: boolean;
}

export default function MovieGrid({ movies, loading }: MovieGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 px-4 md:px-12">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="aspect-[2/3] bg-surface animate-pulse rounded-lg shadow-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 px-4 md:px-12">
      {movies.map((movie) => (
        <div key={movie.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <MovieCard
            id={movie.id}
            title={movie.title}
            poster_path={movie.poster_path}
            vote_average={movie.vote_average}
            release_date={movie.release_date}
          />
        </div>
      ))}
    </div>
  );
}
