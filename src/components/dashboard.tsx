/**
 * @file This module contains the dashboard component.
 * @module dashboard
 * @author Jennifer von Trotta-Treyden <jv222th@student.lnu.se>
 */

import React, { useState } from 'react' // Have to be imported even if it isn't used directly.
import { useMovieData } from '../hooks/useMovieStats.ts'
import { useMoviesPerYearStats } from '../hooks/useMoviesPerYearStats.ts'
import { useGenderStats } from '../hooks/useGenderStats.ts'
import { GenderChart } from './genderChart.tsx'
import { YearChart } from './yearChart.tsx'


/**
 * Setup the dashboard UI.
 *
 * @returns The dashboard component.
 */
export default function Dashboard() {
  const { data, loading } = useMovieData()
  const [yearGenre, setYearGenre] = useState("all")
  const [genderGenre, setGenderGenre] = useState("all")

  if (loading) return <p>Loading...</p> // TO-DO: Update to show a moving loading bar or buffer circle.

  const moviesPerYear = useMoviesPerYearStats(data.movies, yearGenre)
  const genderCounts = useGenderStats(data.actors, data.movies, genderGenre)

  return (
    <div>
      <GenderChart
        genderCounts={genderCounts}
        genres={data.genres}
        selectedGenre={genderGenre}
        onChange={setGenderGenre}
      />
      <YearChart
        moviesPerYear={moviesPerYear}
        genres={data.genres}
        selectedGenre={yearGenre}
        onChange={setYearGenre}
      />
    </div>
  )
}