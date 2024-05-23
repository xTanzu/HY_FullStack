import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {

  const handleVote = (anecdote) => {
    console.log('vote')
  }

   // const anAnecdote = [
   //   {
   //     "content": "If it hurts, do it more often",
   //     "id": "47145",
   //     "votes": 0
   //   },
   // ]
  
  const getAnecdotes = async () => {
    const baseURL = 'http://localhost:3001'
    const response = await axios.get(`${baseURL}/anecdotes`)
    return response.data
  }


  const { isPending, isError, data } = useQuery({
    queryKey: ['notes'],
    queryFn: getAnecdotes,
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
