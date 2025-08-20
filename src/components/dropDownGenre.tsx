/**
 * @file This module contains the dropDown menu component.
 * @module dropDown
 * @author Jennifer von Trotta-Treyden <jv222th@student.lnu.se>
 */

import React from 'react'

interface DropDownGenreProps {
  genres: string[]
  selectedGenre: string
  onChange: (genre: string) => void
}

export function DropDownGenre({ genres, selectedGenre, onChange }: DropDownGenreProps) {
  return (
    <select onChange={(e) => onChange(e.target.value)} value={selectedGenre}>
      <option value="all">All</option>
      {genres.map((g) => (
        <option key={g} value={g}>
          {g}
        </option>
      ))}
    </select>
  )
}
