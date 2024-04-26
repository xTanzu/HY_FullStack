import { useDispatch } from "react-redux"
import { actionAddNewAnecdote } from  "../reducers/anecdoteReducer.js"
import { actionSetNotification } from "../reducers/notificationReducer.js"

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const handleNewAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ""
    dispatch(actionAddNewAnecdote({ content }))
    const notificationMessage = `You created "${content}"`
    dispatch(actionSetNotification(notificationMessage))
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

export default AnecdoteForm
