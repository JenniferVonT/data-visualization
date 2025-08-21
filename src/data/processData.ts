/**
 * @file This module contains the data analysis/processing for gender in movies.
 * @module genderData
 * @author Jennifer von Trotta-Treyden <jv222th@student.lnu.se>
 */

import { GenderCount, MoviesPerYear } from '../hooks/useMovieStats.ts'
import { Movie, Actor } from '../api/client.ts'
import { groupBy, sumBy } from 'lodash'


export function computeMoviesPerYear(movies: any[], selectedGenre: string): MoviesPerYear {
  const filteredMovies = selectedGenre.toLowerCase() === 'all'
    ? movies
    : movies.filter((movie) => movie.genres?.map(genre => genre.toLowerCase()).includes(selectedGenre.toLowerCase()))

    const processedData = filteredMovies.reduce((acc, movie) => {
      const year = movie.release_year

      if (!year) {
        return acc
      }

      acc[year] = (acc[year] || 0) + 1

      return acc
    }, {} as MoviesPerYear)

  return processedData
}


/**
 * Process the data to get the gender diversity in movies.
 *
 * @param actors - actor data.
 * @param movies - movie data.
 * @returns {GenderCount} - Returns the total
 */
export function computeGenderCountsByMovie(actors: Actor[], movies: Movie[], selectedGenre: String = 'all'): GenderCount {
  const counts: GenderCount = { male: 0, female: 0, unknown: 0 }

  // Filter movies by genre.
  const filteredMovies = selectedGenre.toLowerCase() === 'all'
    ? movies
    : movies.filter((movie) => movie.genres?.map(genre => genre.toLowerCase()).includes(selectedGenre.toLowerCase()))


  // Group roles by movie id.
  const rolesByMovie = groupBy(
    actors.flatMap(actor =>
      actor.roles.map(role => ({ ...role, gender: actor.gender }))
    ),
    'movie_id'
  )

  filteredMovies.forEach(movie => {
    const roles = rolesByMovie[movie.id] || []
    counts.male += roles.filter(r => r.gender === 1).length
    counts.female += roles.filter(r => r.gender === 2).length
    counts.unknown += roles.filter(r => ![1, 2].includes(r.gender)).length
  })

  return counts
}
