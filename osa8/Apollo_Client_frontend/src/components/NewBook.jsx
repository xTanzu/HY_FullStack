import { useMutation } from '@apollo/client'

import { useNavigate } from 'react-router-dom'

import { ADD_BOOK, ALL_AUTHORS, ALL_BOOKS, ALL_GENRES, BOOK_COUNT, AUTHOR_COUNT } from '../queries'

import { setErrorMsg, setSuccessMsg, useNotificationDispatch } from '../context/NotificationContext'

import { useState } from 'react'


const NewBook = (props) => {

  const navigate = useNavigate()

  if (!localStorage.getItem('books-user-token')) {
    navigate('/')
  }

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const notificationDispatch = useNotificationDispatch()

  // refetchQueries: [ { query: ALL_AUTHORS }, { query: ALL_BOOKS }, { query: ALL_GENRES }, { query: BOOK_COUNT }, { query: AUTHOR_COUNT } ],
  const [ addBook ] = useMutation(ADD_BOOK, {
    refetchQueries: "active",
    onError: (error) => {
      const meaningfulMessage = error.graphQLErrors[0].extensions.messages.join('\n')
      const message = meaningfulMessage ? meaningfulMessage : error.graphQLErrors.map(e => e.message).join('\n')
      console.log(message)
      notificationDispatch(setErrorMsg(message))
    },
    onCompleted: () => {
      notificationDispatch(setSuccessMsg('book added succesfully'))
    }
  })

  const submit = async (event) => {
    event.preventDefault()
    const response = await addBook({ variables: { title, author, published: Number(published), genres } })
    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <>
      <div>
        <form onSubmit={submit}>
          <div>
            title
            <input
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author
            <input
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            published
            <input
              type="number"
              value={published}
              onChange={({ target }) => setPublished(target.value)}
            />
          </div>
          <div>
            <input
              value={genre}
              onChange={({ target }) => setGenre(target.value)}
            />
            <button onClick={addGenre} type="button">
              add genre
            </button>
          </div>
          <div>genres: {genres.join(' ')}</div>
          <button type="submit">create book</button>
        </form>
      </div>
    </>
  )
}

export default NewBook
