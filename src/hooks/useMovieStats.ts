/**
 * @file This module contains the hook that fetches movie and actor data from the backend and processes it.
 * @module useMovieStats
 * @author Jennifer von Trotta-Treyden <jv222th@student.lnu.se>
 */

import { useEffect, useState } from 'react'
import { fetchMovies, fetchActors, fetchGenres, Movie, Actor } from '../api/client.ts'

export type GenderCount = { male: number; female: number; unknown: number }
export type MoviesPerYear = { [year: number]: number }



export interface MovieStats {
  genderCounts: GenderCount
  moviesPerYear: MoviesPerYear
  genres: string[]
  movies: Movie[]
  actors: Actor[]
}

/**
 * Fetch all data once on launch/mount.
 *
 * @returns Either a loading prompt or the fetched data.
 */
export function useMovieData() {
  const [data, setData] = useState<{ movies: Movie[], actors: Actor[], genres: string[] }>({ movies: [], actors: [], genres: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)

      // Fetch all the data from the backend.
      try {
        const [movies, actors, genres] = await Promise.all([
          fetchMovies(),
          fetchActors(),
          fetchGenres(),
        ])
        setData({ movies, actors, genres })
      } catch (err) {
        console.error(err)
      }

      setLoading(false)
    }
    fetchData()
  }, [])

  return { data, loading }
}