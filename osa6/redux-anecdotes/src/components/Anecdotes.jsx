import { useSelector, useDispatch } from "react-redux"
import { actionVoteForAnecdote } from "../reducers/anecdoteReducer.js"

const Anecdote = ({ anecdote, handleVote }) => {

  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes} {anecdote.votes === 1 ? "vote" : "votes"} {"\u00A0"}
        <button onClick={() => handleVote(anecdote.id)}>vote</button>
      </div>
    </div>
  )
}

const Anecdotes = () => {

  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(actionVoteForAnecdote(id))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.sort((a,b) => b.votes - a.votes).map(anecdote =>
        <Anecdote key={anecdote.id} anecdote={anecdote} handleVote={vote} />
      )}
    </div>
  )
}

export default Anecdotes
