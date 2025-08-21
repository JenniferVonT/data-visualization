/**
 * @file This module contains the data analysis/processing for gender in movies.
 * @module genderData
 * @author Jennifer von Trotta-Treyden <jv222th@student.lnu.se>
 */

import { GenderCount, MoviesPerYear } from '../hooks/useMovieStats.ts'
import { Movie, Actor } from '../api/client.ts'
import { groupBy } from 'lodash'


/**
 * 
 * @param movies - All movie data.
 * @param selectedGenre - The current genre to calculate.
 * @returns {MoviesPerYear} - A processed data object with year and amount per year.
 */
export function computeMoviesPerYear(movies: any[], selectedGenre: string): MoviesPerYear {
  // Filter out all movies that doesn't use the selected genre ("all" uses all the movies).
  const filteredMovies = selectedGenre.toLowerCase() === 'all'
    ? movies
    : movies.filter((movie) => movie.genres?.map(genre => genre.toLowerCase()).includes(selectedGenre.toLowerCase()))

    // Count each movie per year and return the result.
    const processedData = filteredMovies.reduce((acc, movie) => {
      const year = movie.release_year

      // If the movie does not have a release year, move on to the next without counting it.
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
 * @param actors - Actor data.
 * @param movies - Movie data.
 * @param selectedGenre - The current genre.
 * @returns {GenderCount} - Returns the total gender count for the current genre.
 */
export function computeGenderCountsByMovie(actors: Actor[], movies: Movie[], selectedGenre: String = 'all'): GenderCount {
  const counts = { male: 0, female: 0, unknown: 0 }

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

  // Count all the roles for each movie and their gender.
  filteredMovies.forEach(movie => {
    const roles = rolesByMovie[movie.id] || []
    counts.male += roles.filter(r => r.gender === 1).length
    counts.female += roles.filter(r => r.gender === 2).length
    counts.unknown += roles.filter(r => ![1, 2].includes(r.gender)).length
  })


  return [
    { name: 'Male', value: counts.male },
    { name: 'Female', value: counts.female },
    { name: 'Unknown', value: counts.unknown }
  ]
}
