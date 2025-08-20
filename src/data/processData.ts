/**
 * @file This module contains the data analysis/processing for gender in movies.
 * @module genderData
 * @author Jennifer von Trotta-Treyden <jv222th@student.lnu.se>
 */

import { GenderCount, MoviesPerYear } from '../hooks/useMovieStats.ts'

// TO-DO: Implement to calculate based on genre aswell.
export function computeMoviesPerYear(movies: any[], selectedGenre: string): MoviesPerYear {
  const filteredMovies = selectedGenre.toLowerCase() === 'all'
    ? movies
    : movies.filter((m) => m.genre?.includes(selectedGenre))

  return filteredMovies.reduce((acc, movie) => {
    const year = movie.release_year
    if (!year) return acc
    acc[year] = (acc[year] || 0) + 1
    return acc
  }, {} as MoviesPerYear)
}

// TO-DO: Update process to calculate the gender based on the roles and movies, not just the actors.
// TO-DO: Implement a process to do the same but based on genre of the movies.
export function computeGenderCounts(actors: any[]): GenderCount {
  const counts: GenderCount = { male: 0, female: 0, unknown: 0 }
  actors.forEach((actor) => {
    if (actor.gender === 2) counts.male += 1
    else if (actor.gender === 1) counts.female += 1
    else counts.unknown += 1
  })
  return counts
}