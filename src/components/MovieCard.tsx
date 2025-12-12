import type React from "react"
import type { MovieShort } from "../types/Movie"
import { Link } from "react-router-dom"


interface MovieCardProps {
  movie: MovieShort
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const placeholderPoster = "https://via.placeholder.com/300x450?text=No+Image&bg=1a1a1a&textcolor=ff1744"

  return (
    <Link
      to={`/movie/${movie.imdbID}`}
      className="group relative overflow-hidden rounded-xl transition duration-300 transform hover:scale-105 block"
    >
      {/* Glow effect background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#ff1744]/0 to-[#1a1a1a] z-10 group-hover:from-[#ff1744]/20 transition duration-300" />

      {/* Image container */}
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : placeholderPoster}
          alt={movie.Title}
          className="w-full h-[320px] object-cover transition duration-500 group-hover:scale-110 filter group-hover:brightness-110"
        />
      </div>

      {/* Info overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/0 to-transparent z-20 flex flex-col justify-end p-4 translate-y-12 group-hover:translate-y-0 transition duration-300">
        <h2 className="font-bold text-lg mb-1 line-clamp-2 text-[#ffffff] drop-shadow-lg">{movie.Title}</h2>
        <p className="text-sm text-[#b0b0b0] mb-3 drop-shadow">
          {movie.Year} • {movie.Type.toUpperCase()}
        </p>
        <span className="inline-block text-[#ff1744] text-sm font-semibold drop-shadow-lg">View Details →</span>
      </div>

      {/* Red border on hover */}
      <div className="absolute inset-0 border-2 border-[#ff1744] rounded-xl opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none" />
    </Link>
  )
}

export default MovieCard
