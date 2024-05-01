import { useEffect } from "react"
import { useDispatch } from "react-redux"

import { initializeAnecdotes } from "./reducers/anecdoteReducer"

import Filter from "./components/Filter.jsx"
import AnecdoteList from "./components/AnecdoteList.jsx"
import AnecdoteForm from "./components/AnecdoteForm.jsx"
import Notification from "./components/Notification.jsx"

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter/>
      <AnecdoteList/>
      <AnecdoteForm/>
      <Notification/>
    </div>
  )
}

export default App
