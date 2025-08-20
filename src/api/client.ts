/**
 * @file This module contains a client that help connect and fetch data from the backend API.
 * @module client
 * @author Jennifer von Trotta-Treyden <jv222th@student.lnu.se>
 */

import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

const GRAPHQL_ENDPOINT = 'https://jen-movie-api-1239f1b4c492.herokuapp.com/graphql'

export const client = new ApolloClient({
    uri: GRAPHQL_ENDPOINT,
    cache: new InMemoryCache()
})

// Fetch all genres
export const GET_GENRES = gql`
  query GetGenres {
    genres
  }
`

// Fetch paginated movies.
export const GET_MOVIES = gql`
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
export const GET_ACTORS = gql`
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