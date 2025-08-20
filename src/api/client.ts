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
  query GetMovies($page: Int, $limit: Int) {
    movies(page: $page, limit: $limit) {
      movies {
        id
        title
        genre
        release_year
        poster_path
      }
      total    
    }
  }
`

// Fetch paginated actors.
const GET_ACTORS = gql`
  query GetActors($page: Int, $limit: Int) {
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
export async function fetchGenres() {
  const { data } = await client.query({ query: GET_GENRES })
  return data.genres
}

export async function fetchMovies(page = 1, limit = 100) {
  const { data } = await client.query({
    query: GET_MOVIES,
    variables: { page, limit },
  })
  return data.movies.movies
}

export async function fetchActors(page = 1, limit = 100) {
  const { data } = await client.query({
    query: GET_ACTORS,
    variables: { page, limit },
  })
  return data.actors.actors
}