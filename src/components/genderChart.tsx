/**
 * @file This module contains the gender chart component.
 * @module genderChart
 * @author Jennifer von Trotta-Treyden <jv222th@student.lnu.se>
 */

import React, { useState } from'react'
import { GenderCount } from '../hooks/useMovieStats.ts'
import { DropDownGenre } from "./dropDownGenre.tsx"

interface GenderChartProps {
  genderCounts: GenderCount
  genres: string[]
  selectedGenre: string
  onChange: (genre: string) => void
}

export function GenderChart({ genderCounts, genres, selectedGenre, onChange }: GenderChartProps) {
  return (
    <div>
      <h2>Gender Distribution</h2>
      <DropDownGenre
        genres={genres}
        selectedGenre={selectedGenre}
        onChange={onChange}
      />
      <pre>{JSON.stringify(genderCounts, null, 2)}</pre>
    </div>
  )
}
