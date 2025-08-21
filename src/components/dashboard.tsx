/**
 * @file This module contains the dashboard component.
 * @module dashboard
 * @author Jennifer von Trotta-Treyden <jv222th@student.lnu.se>
 */

import React from 'react' // Have to be imported even if it isn't used directly.
import { useMovieStats } from '../hooks/useMovieStats.ts'
import { GenderChart } from './genderChart.tsx'
import { YearChart } from './yearChart.tsx'


export default function Dashboard() {
  const { stats, loading } = useMovieStats()

  if (loading) return <p>Loading...</p> // TO-DO: Update loading screen to a moving loading bar or buffer-circle

  return (
    <div>
      <GenderChart genderCounts={stats.genderCounts} genres={stats.genres} />
      <YearChart moviesPerYear={stats.moviesPerYear} genres={stats.genres} />
    </div>
  )
}