/**
 * @file This module contains a client that help connect and fetch data from the backend API.
 * @module client
 * @author Jennifer von Trotta-Treyden <jv222th@student.lnu.se>
 */

import { ApolloClient, InMemoryCache, gql, FetchResult } from '@apollo/client'

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
        profile_path
        roles {
          character
          movie_id
          movie_title
        }
      }
      total
    }
  }
`

/**
 * Define the interfaces and datatypes to fetch/use.
 */
interface GetMoviesResponse {
  movies: {
    total: number
    movies: Movie[]
  }
}

interface GetActorsResponse {
  actors: {
    total: number
    actors: Actor[]
  }
}

export type Movie = {
  id: number
  title: string
  genres: string[]
  poster_path: string
  release_year: number
}

export type Actor = {
  id: number
  name: string
  gender: number
  roles: { character: string; movie_title: string; movie_id: number }[]
}

/**
 * Fetch all the available genres from the backend.
 *
 * @returns All genres.
 */
export async function fetchGenres () {
  const { data } = await client.query({ query: GET_GENRES })

  return data.genres
}

/**
 * Fetch all the actor data from the backend.
 *
 * @returns All actors.
 */
export async function fetchActors() {
  const limit = 5000 // How many dp to fetch per request.

  // Fetch first page to know total
  const { data: firstData } = await client.mutate<GetActorsResponse>({
    mutation: GET_ACTORS,
    variables: { page: 1, limit },
    fetchPolicy: "no-cache",
  })

  const total = firstData!.actors.total
  const actors = [...firstData!.actors.actors]

  const pages = Math.ceil(total / limit)

  // Fetch remaining pages in parallel.
  if (pages > 1) {
    const promises: Promise<FetchResult<GetActorsResponse>>[] = []
    for (let page = 2; page <= pages; page++) {
      promises.push(
        client.mutate<GetActorsResponse>({
          mutation: GET_ACTORS,
          variables: { page, limit },
          fetchPolicy: "no-cache",
        })
      )
    }

    // Resolve all promises.
    const results = await Promise.all(promises)
    results.forEach((res) => {
      if (res.data) actors.push(...res.data.actors.actors)
    })
  }

  return actors
}

/**
 * Fetch all the movie data from the backend.
 *
 * @returns All movies.
 */
export async function fetchMovies() {
  const limit = 5000 // How many dp to fetch per request.

  // Get the first page to know total.
  const { data: firstData } = await client.mutate<GetMoviesResponse>({
    mutation: GET_MOVIES,
    variables: { page: 1, limit },
    fetchPolicy: "no-cache",
  })

  const total = firstData!.movies.total
  const movies = [...firstData!.movies.movies]

  const pages = Math.ceil(total / limit)

  // Fetch remaining pages in parallel.
  if (pages > 1) {
    const promises: Promise<FetchResult<GetMoviesResponse>>[] = []
    for (let page = 2; page <= pages; page++) {
      promises.push(
        client.mutate<GetMoviesResponse>({
          mutation: GET_MOVIES,
          variables: { page, limit },
          fetchPolicy: "no-cache",
        })
      )
    }

    // Resolve all promises.
    const results = await Promise.all(promises)
    results.forEach((res) => {
      if (res.data) movies.push(...res.data.movies.movies)
    })
  }

  return movies
}



