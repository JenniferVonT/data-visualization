/**
 * @file This module contains the year chart component.
 * @module yearChart
 * @author Jennifer von Trotta-Treyden <jv222th@student.lnu.se>
 */

import React, { useState } from 'react'
import { MoviesPerYear } from '../hooks/useMovieStats'
import { DropDownGenre } from "./dropDownGenre.tsx"

interface YearChartProps {
  moviesPerYear: MoviesPerYear
  genres: string[]
  selectedGenre: string
  onChange: (genre: string) => void
}

export function YearChart({ moviesPerYear, genres, selectedGenre, onChange }: YearChartProps) {
  return (
    <div>
      <h2>Movies Per Year</h2>
      <DropDownGenre
        genres={genres}
        selectedGenre={selectedGenre}
        onChange={onChange}
      />
      <pre>{JSON.stringify(moviesPerYear, null, 2)}</pre>
    </div>
  )
}
