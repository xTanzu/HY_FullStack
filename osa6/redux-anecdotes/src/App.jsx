import { useSelector, useDispatch } from "react-redux"
import Anecdotes from "./components/Anecdotes.jsx"
import { actionVoteForAnecdote } from "./reducers/anecdoteReducer.js"

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(actionVoteForAnecdote(id))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <Anecdotes key={anecdote.id} anecdote={anecdote} handleVote={vote} />
      )}
      <h2>create new</h2>
      <form>
        <div><input /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App
