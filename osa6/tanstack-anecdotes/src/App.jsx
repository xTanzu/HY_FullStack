import { useContext } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import requests from './services/requests.js'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import NotificationContext from './NotificationContext'

const App = () => {

  const [notificationMessage, notificationDispatch] = useContext(NotificationContext)

  const queryClient = useQueryClient()

  const voteMutation = useMutation({
    mutationFn: requests.putAnecdote,
    onSuccess: (votedAnecdote) => {
      queryClient.setQueryData(['anecdotes'], (oldAnecdotes) => {
        return oldAnecdotes.map(anecdote => anecdote.id === votedAnecdote.id ? votedAnecdote : anecdote)
      })
    }
  })

  const handleVote = (anecdote) => {
    const votedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    voteMutation.mutate(votedAnecdote)
    notificationDispatch({ type: "VOTED", payload: anecdote.content })
  }

  const { isPending, isError, data } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: requests.getAnecdotes,
    retry: 1,
  })

  if (isPending) {
    return <div>loading...</div>
  }

  if (isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
