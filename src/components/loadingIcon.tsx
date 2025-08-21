/**
 * @file This module contains the loading icon.
 * @module loadingIcon
 * @author Jennifer von Trotta-Treyden <jv222th@student.lnu.se>
 */

import React from 'react' // OBS! Needs to be imported.

/**
 * Creates a loading icon element/component.
 *
 * @returns - A finished loading icon element/component.
 */
export function LoadingIcon () {

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh'
    }}>
      <img 
        src= '../loadingGif.svg' // Use a pre-made loading gif for the easiest application.
        alt="Loading..." 
        style={{ width: 80, height: 80 }}
      />
      <p>Loading data, please wait...</p>
    </div>
  )
}