/**
 * @file This module contains the hook that fetches movie and actor data from the backend and processes it.
 * @module useMovieStats
 * @author Jennifer von Trotta-Treyden <jv222th@student.lnu.se>
 */

import { useEffect, useState } from 'react'
import { fetchMovies, fetchActors, fetchGenres } from '../api/client.ts'
import { computeMoviesPerYear, computeGenderCountsByMovie } from '../data/processData.ts'

export type GenderCount = { male: number; female: number; unknown: number }
export type MoviesPerYear = { [year: number]: number }

export type Movie = {
  id: number
  title: string
  genres: string[]
  poster_path: string
  release_year: number
}

export type Actor = {
  id: number
  name: string
  gender: number
  roles: { character: string; movie_title: string; movie_id: number }[]
}

export interface MovieStats {
  genderCounts: GenderCount
  moviesPerYear: MoviesPerYear
  genres: string[]
  movies: Movie[]
  actors: Actor[]
}

export function useMovieStats(selectedGenre: string = 'all') {
  // State for raw fetched data
  const [data, setData] = useState<{ movies: Movie[]; actors: Actor[]; genres: string[] }>({
    movies: [],
    actors: [],
    genres: [],
  })

  // State for computed stats for charts
  const [stats, setStats] = useState<MovieStats>({
    genderCounts: { male: 0, female: 0, unknown: 0 },
    moviesPerYear: {},
    genres: [],
    movies: [],
    actors: [],
  })

  const [loading, setLoading] = useState(true)

  // Fetch data once on mount
  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        const [movies, actors, genres] = await Promise.all([
          fetchMovies(),
          fetchActors(),
          fetchGenres(),
        ])
        setData({ movies, actors, genres })

        // Compute initial stats using the default selectedGenre
        setStats({
          moviesPerYear: computeMoviesPerYear(movies, selectedGenre),
          genderCounts: computeGenderCountsByMovie(actors, movies),
          movies,
          actors,
          genres,
        })
      } catch (err) {
        console.error('Error fetching or processing data', err)
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  // Recompute stats when selectedGenre changes
  useEffect(() => {
    setStats((prev) => ({
      ...prev,
      moviesPerYear: computeMoviesPerYear(data.movies, selectedGenre),
    }))
  }, [selectedGenre, data.movies])

  return { stats, loading }
}
