"use client"

import React, { useState, useEffect } from "react"
import axios from "axios"
import SearchBar from "../components/SearchBar"
import MovieCard from "../components/MovieCard"
import type { MovieShort } from "../types/Movie"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

const API_KEY = import.meta.env.VITE_OMDB_API_KEY

export const HomePage: React.FC = () => {
  const [searchText, setSearchText] = useState("Batman")
  const [movies, setMovies] = useState<MovieShort[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Logout logic
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const searchMovies = async () => {
    if (!API_KEY) {
      setError("API key is not configured. Please add VITE_OMDB_API_KEY to .env file.")
      return
    }
    if (!searchText.trim()) return

    try {
      setLoading(true)
      setError(null)

      const response = await axios.get("https://www.omdbapi.com/", {
        params: { apikey: API_KEY, s: searchText },
      })

      if (response.data.Response === "True") {
        setMovies(response.data.Search)
      } else {
        setMovies([])
        setError(response.data.Error || "No movies found.")
      }
    } catch (err) {
      console.error(err)
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    searchMovies()
  }, [])

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      
      {/* Background Effect */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff1744]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#e91e63]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Header + Logout */}
        <div className="mb-12 flex items-center justify-between">

          {/* Title */}
          <div>
            <h1 className="text-5xl sm:text-6xl font-bold mb-3 text-white drop-shadow-lg">
              Movie<span className="text-[#ff1744]">DB</span>
            </h1>
            <p className="text-[#b0b0b0] text-lg max-w-md">
              Discover and explore movies with stunning cinematics.
            </p>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold shadow-lg 
            active:scale-95 transition duration-150"
          >
            Logout
          </button>
        </div>

        {/* Search Bar */}
        <SearchBar value={searchText} onChange={setSearchText} onSubmit={searchMovies} />

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 bg-gradient-to-r from-[#ff1744] to-[#e91e63] rounded-full animate-spin" />
              <div className="absolute inset-1 bg-[#0f0f0f] rounded-full" />
            </div>
            <p className="ml-4 text-[#b0b0b0] text-lg">Loading movies...</p>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="bg-[#ff1744]/10 border border-[#ff1744] rounded-lg p-4 mb-6">
            <p className="text-[#ff1744] font-medium">{error}</p>
          </div>
        )}

        {/* Movie Grid */}
        {!loading && movies.length > 0 && (
          <div>
            <p className="text-[#808080] text-sm uppercase tracking-widest mb-6">
              Found {movies.length} results
            </p>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {movies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && movies.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 bg-[#252525] rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-[#808080]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3v-9"
                />
              </svg>
            </div>
            <p className="text-[#808080] text-center max-w-sm">
              No movies found. Try searching for your favorite movie!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
