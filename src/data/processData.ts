/**
 * @file This module contains the data analysis/processing for gender in movies.
 * @module genderData
 * @author Jennifer von Trotta-Treyden <jv222th@student.lnu.se>
 */

import { GenderCount, MoviesPerYear, Actor } from '../hooks/useMovieStats.ts'
import { groupBy, sumBy } from 'lodash'

// TO-DO: Implement a process to do the same but based on genre of the movies.
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


/**
 * Process the data to get the gender diversity in movies.
 *
 * @param actors - actor data.
 * @param movies - movie data.
 * @returns {GenderCount} - Returns the total
 */
// TO-DO: Implement a process to do the same but based on genre of the movies.
export function computeGenderCountsByMovie(actors: Actor[], movies: { id: number }[]) {
  const counts = { male: 0, female: 0, unknown: 0 }

  // group roles by movie_id
  const rolesByMovie = groupBy(
    actors.flatMap(actor =>
      actor.roles.map(role => ({ ...role, gender: actor.gender }))
    ),
    'movie_id'
  )

  movies.forEach(movie => {
    const roles = rolesByMovie[movie.id] || []
    counts.male += roles.filter(r => r.gender === 1).length
    counts.female += roles.filter(r => r.gender === 2).length
    counts.unknown += roles.filter(r => ![1, 2].includes(r.gender)).length
  })

  return counts
}
