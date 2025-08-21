/**
 * @file This module contains the dropDown menu component.
 * @module dropDown
 * @author Jennifer von Trotta-Treyden <jv222th@student.lnu.se>
 */

import React from 'react' // OBS! Needs to be imported.

// Set the datatypes for the parameter.
interface DropDownGenreProps {
  genres: string[]
  selectedGenre: string
  onChange: (genre: string) => void
}

/**
 * Create the dropdown menu that tracks genre changes.
 *
 * @param {DropDownGenreProps} - Data packet with all available genres and current selected genre.
 * @returns - A finished dropdown menu element/component.
 */
export function DropDownGenre({ genres, selectedGenre, onChange }: DropDownGenreProps) {
  return (
    // Populate the droplist with the available genres, always use "all" as the starting default.
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
