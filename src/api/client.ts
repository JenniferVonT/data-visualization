/**
 * @file This module contains a client that help connect and fetch data from the backend API.
 * @module client
 * @author Jennifer von Trotta-Treyden <jv222th@student.lnu.se>
 */

import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

const GRAPHQL_ENDPOINT = 'https://jen-movie-api-1239f1b4c492.herokuapp.com/graphql'

// Initialize the client that points to the backend.
const client = new ApolloClient({
    uri: GRAPHQL_ENDPOINT,
    cache: new InMemoryCache()
})

/**
 * Define all the queries that we will need.
 */

// Fetch all genres
const GET_GENRES = gql`
  query GetGenres {
    genres
  }
`

// Fetch paginated movies.
const GET_MOVIES = gql`
  mutation GetMovies($page: Int, $limit: Int) {
    movies(page: $page, limit: $limit) {
      total
      movies {
        id
        title
        genres
        poster_path
        release_year
      }
    }
  }
`

// Fetch paginated actors.
const GET_ACTORS = gql`
  mutation GetActors($page: Int, $limit: Int) {
    actors(page: $page, limit: $limit) {
      actors {
        id
        name
        gender
      }
      total
    }
  }
`

// Fetch functions
export async function fetchGenres () {
  const { data } = await client.query({ query: GET_GENRES })

  return data.genres
}

export async function fetchActors() {
  let allActors: any[] = []
  let page = 1
  const limit = 1000
  let hasMore = true

    while (hasMore) {
      const { data } = await client.mutate({
        mutation: GET_ACTORS,
        variables: { page, limit },
        fetchPolicy: "no-cache"
      })
    

    const actors = data.actors.actors;
    const total = data.actors.total;

    allActors = [...allActors, ...actors]

    // stop if we’ve fetched everything
    if (allActors.length >= total) {
      hasMore = false
    } else {
      page++
    }
  }

  return allActors
}

/**
 * Function that paginates so it can fetch all results.
 *
 * @returns 
 */
export async function fetchMovies () {
  let allMovies: any[] = []
  let page = 1
  const limit = 1000
  let hasMore = true

  while (hasMore) {
    const { data } = await client.mutate({
      mutation: GET_MOVIES,
      variables: { page, limit },
      fetchPolicy: "no-cache", // avoid Apollo caching issues
    })

    const movies = data.movies.movies;
    const total = data.movies.total;

    allMovies = [...allMovies, ...movies]

    // stop if we’ve fetched everything
    if (allMovies.length >= total) {
      hasMore = false
    } else {
      page++
    }
  }

  return allMovies
}



