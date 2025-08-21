/**
 * @file This module contains the year chart component.
 * @module yearChart
 * @author Jennifer von Trotta-Treyden <jv222th@student.lnu.se>
 */

import React from 'react' // OBS! Needs to be imported.
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

interface YearChartProps {
  moviesPerYear: { [year: number]: number }
}

/**
 * Build the chart to show movies released per year.
 *
 * @param {YearChartProps} moviesPerYear - All the processed movie data needed.
 * @returns - A finished year chart element/component
 */
export function YearChart({ moviesPerYear }: YearChartProps) {
  // Convert object to array and sort by year
  const data = Object.entries(moviesPerYear)
    .map(([year, count]) => ({ year, count }))
    .sort((a, b) => +a.year - +b.year)

  return (
    <LineChart width={800} height={400} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="year" type="category" />
      <YAxis />
      <Tooltip />
      <Line
        type="monotone"
        dataKey="count"
        stroke="#2d8b49ff"
        strokeWidth={2}
        dot={{ r: 5 }}
        isAnimationActive={true}
        animationDuration={800}
      />
    </LineChart>
  )
}