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

const AnecdoteList = () => {

  const anecdotes = useSelector(({ anecdotes, filter }) => anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase())))
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(actionVoteForAnecdote({ id }))
  }

  return (
    <div>
      {anecdotes.sort((a,b) => b.votes - a.votes).map(anecdote =>
        <Anecdote key={anecdote.id} anecdote={anecdote} handleVote={vote} />
      )}
    </div>
  )
}

export default AnecdoteList