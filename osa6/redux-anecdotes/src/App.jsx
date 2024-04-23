import Filter from "./components/Filter.jsx"
import AnecdoteList from "./components/AnecdoteList.jsx"
import AnecdoteForm from "./components/AnecdoteForm.jsx"

const App = () => {

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter/>
      <AnecdoteList/>
      <AnecdoteForm/>
    </div>
  )
}

export default App
