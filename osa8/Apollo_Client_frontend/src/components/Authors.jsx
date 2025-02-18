import { useQuery } from '@apollo/client'

import { ALL_AUTHORS } from '../queries'

import AuthorDisplay from './AuthorDisplay'
import BornForm from './BornForm'
import BornSelect from './BornSelect'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)

  if (result.loading) {
    return <div>...loading</div>
  }

  const authors = result.data.allAuthors

  return (
    <>
      <AuthorDisplay authors={authors} />
      <BornSelect authors={authors}/>
    </>
  )
}

export default Authors
