import { useState, useEffect } from 'react'

import { useQuery } from '@apollo/client'

import BookDisplay from './BookDisplay'

import { ALL_BOOKS, ALL_GENRES } from '../queries'

const Books = (props) => {

  const [genreFilter, setGenreFilter] = useState(null)

  const booksResult = useQuery(ALL_BOOKS, {
    variables: {
      genre: genreFilter
    },
    fetchPolicy: "cache-and-network",
  })
  const genresResult = useQuery(ALL_GENRES, {
    fetchPolicy: "cache-and-network",
  })

  useEffect(() => {
    genresResult.refetch()
  }, [genreFilter])

  if (booksResult.loading) {
    return <div>...loading</div>
  }
  
  const books = booksResult.data.allBooks
  const genres = !genresResult.loading ? genresResult.data.allGenres : []

  return (
    <div>
      <h2>books</h2>

      { genreFilter && <h3>{genreFilter}</h3> }

      <BookDisplay books={books} />

      {genres.map((g) => (
        <button key={g.genre} onClick={() => setGenreFilter(g.genre)}>{g.genre}</button>
      ))}
      <button onClick={() => setGenreFilter(null)}>All</button>
    </div>
  )
}

export default Books
