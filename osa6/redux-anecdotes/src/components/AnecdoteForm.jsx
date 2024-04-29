import { useDispatch } from "react-redux"

import anecdoteService from "../services/anecdotes"
import { actionAppendAncdote } from  "../reducers/anecdoteReducer.js"
import { actionSetNotification } from "../reducers/notificationReducer.js"

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const handleNewAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ""
    const anecdote = await anecdoteService.createNew(content)
    dispatch(actionAppendAncdote(anecdote))
    const notificationMessage = `You created "${anecdote.content}"`
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
