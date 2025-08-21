/**
 * @file This module contains the hook that handles the year chart updates.
 * @module useMoviePerYearStats
 * @author Jennifer von Trotta-Treyden <jv222th@student.lnu.se>
 */

import { computeMoviesPerYear } from '../data/processData'
import { Movie } from '../api/client.ts'

/**
 * Process the data to calculate movies released per year.
 *
 * @param movies - All movie data.
 * @param selectedGenre - The current genre.
 * @returns  - The processed data.
 */
export function useMoviesPerYearStats(movies: Movie[], selectedGenre: string) {
  // Call the data processor function.
  return computeMoviesPerYear(movies, selectedGenre)
}