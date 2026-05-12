import { useQuery } from '@apollo/client'

import { ALL_BOOKS, ALL_GENRES } from '../queries'

const Books = (props) => {
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
          {books.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((g) => (
        <button key={g.genre}>{g.genre}</button>
      ))}
    </div>
  )
}

export default Books
