import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"
import type { MovieDetail } from "../types/Movie"

const API_KEY = import.meta.env.VITE_OMDB_API_KEY

const MovieDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [movie, setMovie] = useState<MovieDetail | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const placeholderPoster =
    "https://via.placeholder.com/400x600?text=No+Image&bg=1a1a1a&textcolor=ff1744"

  const fetchMovie = async () => {
    if (!API_KEY) {
      setError("API key is missing. Add VITE_OMDB_API_KEY to .env")
      return
    }

    if (!id) return

    try {
      setLoading(true)
      setError(null)

      const response = await axios.get("https://www.omdbapi.com/", {
        params: {
          apikey: API_KEY,
          i: id,
          plot: "full",
        },
      })

      if (response.data.Response === "True") {
        setMovie(response.data)
      } else {
        setError(response.data.Error || "Movie not found")
      }
    } catch (err) {
      console.error(err)
      setError("Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMovie()
  }, [id])

  return (
    <div className="min-h-screen bg-[#0f0f0f]">

      {/* Background effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-10">

        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 mb-8 text-pink-500 hover:text-pink-400 transition font-medium"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to search
        </Link>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full animate-spin" />
              <div className="absolute inset-1 bg-[#0f0f0f] rounded-full" />
            </div>
            <p className="ml-4 text-gray-400 text-lg">Loading...</p>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="bg-red-600/10 border border-red-600 text-red-400 rounded-lg p-4 mb-6">
            {error}
          </div>
        )}

        {/* Movie Details */}
        {movie && !loading && (
          <div className="bg-[#1a1a1a] rounded-2xl border border-gray-800 shadow-2xl overflow-hidden">
            <div className="flex flex-col md:flex-row gap-10 p-8">

              {/* Poster */}
              <div className="flex-shrink-0">
                <img
                  src={movie.Poster !== "N/A" ? movie.Poster : placeholderPoster}
                  alt={movie.Title}
                  className="w-full md:w-72 rounded-xl shadow-xl"
                />
              </div>

              {/* Info Panel */}
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                  {movie.Title}
                </h1>

                {/* Tags */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="px-4 py-1 bg-pink-600 text-white rounded-full text-sm font-semibold">
                    {movie.Year}
                  </span>
                  <span className="px-4 py-1 bg-gray-800 text-gray-300 rounded-full text-sm">
                    {movie.Runtime}
                  </span>
                  <span className="px-4 py-1 bg-gray-800 text-gray-300 rounded-full text-sm">
                    {movie.Rated}
                  </span>
                </div>

                {/* IMDb Rating */}
                {movie.imdbRating !== "N/A" && (
                  <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-700">
                    <div className="w-20 h-20 bg-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                      <p className="text-3xl font-bold text-white">{movie.imdbRating}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">IMDb Rating</p>
                      <p className="text-gray-300 font-medium">Out of 10</p>
                    </div>
                  </div>
                )}

                {/* Genres */}
                {movie.Genre && (
                  <div className="mb-8">
                    <p className="text-gray-500 uppercase text-sm mb-2">Genres</p>
                    <div className="flex flex-wrap gap-2">
                      {movie.Genre.split(", ").map((g) => (
                        <span key={g} className="px-3 py-1 bg-gray-800 border border-gray-700 text-gray-300 rounded-full text-sm">
                          {g}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Plot */}
                <div className="mb-8">
                  <p className="text-gray-500 uppercase text-sm mb-2">Plot</p>
                  <p className="text-gray-300 leading-relaxed">{movie.Plot}</p>
                </div>

                {/* Credits */}
                <div className="space-y-5 max-w-lg">
                  <MovieDetailItem label="Director" value={movie.Director} />
                  <MovieDetailItem label="Cast" value={movie.Actors} />
                  <MovieDetailItem label="Writer" value={movie.Writer} />
                  <MovieDetailItem label="Language" value={movie.Language} />
                </div>

              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// SIMPLE DETAIL COMPONENT INLINE (no import required)
const MovieDetailItem = ({ label, value }: { label: string; value: any }) => {
  if (!value || value === "N/A") return null
  return (
    <div>
      <p className="text-gray-500 uppercase text-xs mb-1">{label}</p>
      <p className="text-gray-300">{value}</p>
    </div>
  )
}

export default MovieDetailPage
