/**
 * @file This module contains the hook that handles the gender chart updates.
 * @module useGenderStats
 * @author Jennifer von Trotta-Treyden <jv222th@student.lnu.se>
 */

import { computeGenderCountsByMovie } from '../data/processData.ts'
import { Actor, Movie } from '../api/client.ts'

/**
 * Process the data to calculate movies released per year.
 *
 * @param actors - All actor data.
 * @param movies - All movie data.
 * @param selectedGenre - Current genre.
 * @returns 
 */
export function useGenderStats(actors: Actor[], movies: Movie[], selectedGenre: string) {
  return computeGenderCountsByMovie(actors, movies, selectedGenre)
}