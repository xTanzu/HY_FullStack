import { useState } from 'react'

import { useQuery } from '@apollo/client'

import { ALL_BOOKS, ALL_GENRES } from '../queries'

const Books = (props) => {

  const [genreFilter, setGenreFilter] = useState(null)

  const booksResult = useQuery(ALL_BOOKS)
  const genresResult = useQuery(ALL_GENRES)

  if (booksResult.loading) {
    return <div>...loading</div>
  }
  
  const books = booksResult.data.allBooks
  const genres = !genresResult.loading ? genresResult.data.allGenres : []
  
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books
            .filter((b) => (genreFilter == null ? true : b.genres.includes(genreFilter)))
            .map((b) => (
              <tr key={b.title}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {genres.map((g) => (
        <button key={g.genre} onClick={() => setGenreFilter(g.genre)}>{g.genre}</button>
      ))}
      <button onClick={() => setGenreFilter(null)}>All</button>
    </div>
  )
}

export default Books
