const Anecdotes = ({ anecdote, handleVote }) => {

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

export default Anecdotes
