import MovieCard from "./MovieCard";

interface MovieGridProps {
  movies: any[];
}

export default function MovieGrid({ movies }: MovieGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 px-4 md:px-12">
      {movies.map((movie) => (
        <div key={movie.id}>
          <MovieCard
            id={movie.id}
            title={movie.title}
            poster_path={movie.poster_path}
            vote_average={movie.vote_average}
          />
        </div>
      ))}
    </div>
  );
}
