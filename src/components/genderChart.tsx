/**
 * @file This module contains the gender chart component.
 * @module genderChart
 * @author Jennifer von Trotta-Treyden <jv222th@student.lnu.se>
 */

import React, { useState } from'react' // OBS! Needs to be imported.
import { PieChart, Pie, Cell, Tooltip, Legend, Sector, PieProps } from 'recharts'
import { GenderCount } from '../hooks/useMovieStats.ts'

const COLORS = ['#8cc9f1ff', '#ffc2edff', '#2d8b49ff'] // colors for male, female, unknown

interface GenderChartProps {
  genderCounts: GenderCount
}

// Create the effect for an active slice to "slide out" from the piechart.
const renderActiveShape = (props: any) => {
  const {
    cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill
  } = props

  const RADIAN = Math.PI / 180;
  const offset = 10; // slide-out distance
  const dx = Math.cos(-midAngle * RADIAN) * offset
  const dy = Math.sin(-midAngle * RADIAN) * offset

  return (
    <Sector
      cx={cx + dx}
      cy={cy + dy}
      innerRadius={innerRadius}
      outerRadius={outerRadius}
      startAngle={startAngle}
      endAngle={endAngle}
      fill={fill}
    />
  )
}

/**
 * Create the chart that visualizes gender diversity in movies.
 *
 * @param {GenderChartProps} genderCounts - All the processed data about gender diversity.
 * @returns - A finished piechart element/component.
 */
export function GenderChart({ genderCounts }: GenderChartProps) {
  const [activeIndex, setActiveIndex] = useState<number>(-1)

  // Return the piechart element/component.
  return (
    <PieChart width={400} height={400}>
      <Pie
        {...({
          data: genderCounts,
          dataKey: 'value',
          nameKey: 'name',
          cx: '50%',
          cy: '50%',
          outerRadius: 120,
          label: false,
          activeIndex,           // only changes on hover
          activeShape: renderActiveShape,
          onMouseEnter: (_, index) => setActiveIndex(index),
          onMouseLeave: () => setActiveIndex(-1), // reset on mouse leave
        } as any)}
      >
        {genderCounts.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} /> // Set all the key/value pairs and corresponding color for each slice.
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  )
}