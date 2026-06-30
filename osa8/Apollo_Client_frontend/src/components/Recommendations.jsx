import { useQuery } from '@apollo/client'

import BookDisplay from './BookDisplay'

import { ME, ALL_BOOKS } from '../queries'

const Recommendations = (props) => {

  const meResult = useQuery(ME)

  const favouriteBooksResult = useQuery(
    ALL_BOOKS,
    {
      variables: {
        genre: meResult.data?.me?.favouriteGenre
      },
      skip: meResult.loading
    }
  )

  if (meResult.loading || favouriteBooksResult.loading) {
    return <div>...loading</div>
  }

  const me = meResult.data.me
  const favouriteBooks = favouriteBooksResult.data.allBooks

  return (
    <div>
      <h2>Recommendations</h2>
      <div>
        <BookDisplay books={favouriteBooks}/>
      </div>      
    </div>
  )
}
export default Recommendations
