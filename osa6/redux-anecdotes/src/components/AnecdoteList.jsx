import { useSelector, useDispatch } from "react-redux"
import { voteForAnecdote } from "../reducers/anecdoteReducer.js"
import { actionSetNotification } from "../reducers/notificationReducer.js"

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
    dispatch(voteForAnecdote(id))
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
