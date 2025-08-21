/**
 * @file This module contains the hook that fetches movie and actor data from the backend and processes it.
 * @module useMovieStats
 * @author Jennifer von Trotta-Treyden <jv222th@student.lnu.se>
 */

import { useEffect, useState } from 'react'
import { fetchMovies, fetchActors, fetchGenres, Movie, Actor } from '../api/client.ts'

/**
 * Set the unique data types.
 */
export type GenderCount = [
      { name: string, value: number },
      { name: string, value: number },
      { name: string, value: number }
    ]

export type MoviesPerYear = { [year: number]: number }


/**
 * Fetch all data once on launch/mount.
 *
 * @returns - Loading prompt and/or the fetched data.
 */
export function useMovieData () {
  const [data, setData] = useState<{ movies: Movie[], actors: Actor[], genres: string[] }>({ movies: [], actors: [], genres: [] })
  const [loading, setLoading] = useState(true)

  // Called on launch/mount to fetch all the data.
  useEffect(() => {
    async function fetchData() {
      setLoading(true)

      // Call the API client.
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

      // If the data is finished loading set the loading prompt to false.
      setLoading(false)
    }
    // Call the function once.
    fetchData()
  }, [])

  return { data, loading }
}