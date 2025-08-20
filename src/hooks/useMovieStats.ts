/**
 * @file This module contains the hook that fetches movie and actor data from the backend and processes it.
 * @module useMovieStats
 * @author Jennifer von Trotta-Treyden <jv222th@student.lnu.se>
 */

import { useEffect, useState } from 'react'
import { fetchMovies, fetchActors, fetchGenres } from '../api/client.ts'
import { computeMoviesPerYear, computeGenderCounts } from '../data/processData.ts'

export type GenderCount = { male: number; female: number; unknown: number }
export type MoviesPerYear = { [year: number]: number }
export interface MovieStats { genderCounts: GenderCount; moviesPerYear: MoviesPerYear; genres: string[] }

export function useMovieStats(selectedGenre: string = 'all') {
  const [stats, setStats] = useState<MovieStats>({
    genderCounts: { male: 0, female: 0, unknown: 0 },
    moviesPerYear: {},
    genres: [],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)

      try {
        const [movies, actors, genres] = await Promise.all([
          fetchMovies(),
          fetchActors(),
          fetchGenres(),
        ])

        const moviesPerYear = computeMoviesPerYear(movies, selectedGenre)
        const genderCounts = computeGenderCounts(actors)

        setStats({ moviesPerYear, genderCounts, genres })
      } catch (err) {
        console.error('Error fetching or processing data', err)
      }

      setLoading(false)
    }

    fetchData()
  }, [selectedGenre])

  return { stats, loading }
}
