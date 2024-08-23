import { useContext } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import requests from '../services/requests.js'
import NotificationContext from '../NotificationContext'


const AnecdoteForm = () => {

  const queryClient = useQueryClient()

  const [notificationMessage, notificationDispatch] = useContext(NotificationContext)

  const newAnecdoteMutation = useMutation({
    mutationFn: requests.postAnecdote,
    onSuccess: (addedAnecdote) => {
      // queryClient.invalidateQueries({ querykey: ['anecdotes'] })
      queryClient.setQueryData(['anecdotes'], (oldAnecdotes) => {
        return oldAnecdotes.concat(addedAnecdote)
      })
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    // console.log(content)
    newAnecdoteMutation.mutate({ content, votes: 0 })
    notificationDispatch({ type: "NEW", payload: content })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
