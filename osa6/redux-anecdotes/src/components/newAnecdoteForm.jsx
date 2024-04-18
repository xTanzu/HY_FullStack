import { useDispatch } from "react-redux"
import { actionAddNewAnecdote } from  "../reducers/anecdoteReducer.js"

const NewAnecdoteForm = () => {

  const dispatch = useDispatch()

  const handleNewAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ""
    dispatch(actionAddNewAnecdote(content))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleNewAnecdote}>
        <div>
          <input name="content" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default NewAnecdoteForm
