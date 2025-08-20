import React, { useState } from 'react'
import { useMovieStats } from '../hooks/useMovieStats.ts'

export default function Dashboard() {
  const [genre, setGenre] = useState("all")
  const { stats, loading } = useMovieStats(genre)

  if (loading) return <p>Loading...</p>

  return (
    <div>
      <select onChange={(e) => setGenre(e.target.value)} value={genre}>
        <option value="all">All</option>
        {stats.genres.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>

      <h2>Gender Distribution</h2>
      <pre>{JSON.stringify(stats.genderCounts, null, 2)}</pre>

      <h2>Movies Per Year</h2>
      <pre>{JSON.stringify(stats.moviesPerYear, null, 2)}</pre>
    </div>
  )
}