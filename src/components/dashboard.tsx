/**
 * @file This module contains the dashboard component.
 * @module dashboard
 * @author Jennifer von Trotta-Treyden <jv222th@student.lnu.se>
 */

import React, { useState } from 'react' // OBS! Needs to be imported.
import { useMovieData } from '../hooks/useMovieStats.ts'
import { useMoviesPerYearStats } from '../hooks/useMoviesPerYearStats.ts'
import { useGenderStats } from '../hooks/useGenderStats.ts'
import { GenderChart } from './genderChart.tsx'
import { YearChart } from './yearChart.tsx'
import { DropDownGenre } from './dropDownGenre.tsx'
import { LoadingIcon } from './loadingIcon.tsx'


/**
 * Setup the dashboard UI.
 *
 * @returns The dashboard component.
 */
export default function Dashboard() {
  // Get all relevant data for the charts to work.
  const { data, loading } = useMovieData()
  const [yearGenre, setYearGenre] = useState("all")
  const [genderGenre, setGenderGenre] = useState("all")

  // If the data isn't done fetching and processing show a loading icon instead.
  if (loading) return <LoadingIcon />

  const moviesPerYear = useMoviesPerYearStats(data.movies, yearGenre)
  const genderCounts =  useGenderStats(data.actors, data.movies, genderGenre)


  // Return a div component with all the charts and titles.
  return (
    <div>
      <div id="genderChart">
        <h3>Gender diversity in movies</h3>

        <div>
          <p>View by genre:</p>
          <DropDownGenre
            genres={data.genres}
            selectedGenre={genderGenre}
            onChange={setGenderGenre}
          />
        </div>

        <GenderChart genderCounts={genderCounts} />
      </div>

      <hr></hr>

      <div id="yearChart">
        <h3>How many movies were released each year</h3>

        <div>
          <p>View by genre:</p>
            <DropDownGenre
              genres={data.genres}
              selectedGenre={yearGenre}
              onChange={setYearGenre}
            />
          </div>
        <YearChart moviesPerYear={moviesPerYear} />
      </div>
    </div>
  )
}