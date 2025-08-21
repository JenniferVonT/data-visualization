/**
 * @file This module contains the loading icon.
 * @module loadingIcon
 * @author Jennifer von Trotta-Treyden <jv222th@student.lnu.se>
 */

import React from 'react'

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
        src= '../public/loadingGif.svg'
        alt="Loading..." 
        style={{ width: 80, height: 80 }}
      />
      <p>Loading data, please wait...</p>
    </div>
  )
}