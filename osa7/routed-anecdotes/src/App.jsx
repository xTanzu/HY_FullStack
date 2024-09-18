import { useState, useEffect } from 'react'
import { 
  Routes,
  Route,
  Link,
  useMatch,
  useNavigate
} from "react-router-dom"
import { useField } from './hooks/'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link style={padding} to={"/"}>anecdotes</Link>
      <Link style={padding} to={"/createnew"}>create new</Link>
      <Link style={padding} to={"/about"}>about</Link>
    </div>
  )
}

const Notification = ({ message }) => {

  const notifyStyle = {
    visibility: message == "" ? "hidden" : "visible",
    display: "block",
    width: "max-content",
    padding: "8px 40px",
    border: "solid gray 2px",
    borderRadius: 8,
    color: "dimgrey",
    background: "#D3FFD3",
  }

  return (
    <div style={notifyStyle}>{message}</div>
  )
}

const AnecdoteList = ({ anecdotes }) => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map(anecdote => ( 
          <li key={anecdote.id}>
            <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
          </li> 
        ))}
      </ul>
    </div>
  )
}

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>"{ anecdote.content }" by {anecdote.author}</h2>
      <p>has {anecdote.votes} {anecdote.votes === 1 ? "vote" : "votes"}</p>
      <p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p> 
    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const { onClear: clearContent, ...content } = useField('text')
  const { onClear: clearAuthor, ...author } = useField('text')
  const { onClear: clearInfo, ...info } = useField('text')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    navigate("/")
  }

  const handleClearAll = (e) => {
    e.preventDefault()
    const clearFuncs = [clearContent, clearAuthor, clearInfo]
    clearFuncs.forEach(func => func())
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
        <button onClick={handleClearAll}>reset</button>
      </form>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 1,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const clearNotification = () => {
    setNotification("")
  }

  useEffect(() => {
    if ( notification !== "") {
      const clearNotificationTimeout = setTimeout(clearNotification, 5000)
      return () => clearTimeout(clearNotificationTimeout)
    }
  }, [notification])

  const singleAnecdoteMatch = useMatch("/anecdotes/:id")

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification((`a new anecdote "${anecdote.content}" by ${anecdote.author} was added`))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const anecdote = singleAnecdoteMatch
    ? anecdotes.find(anecdote => anecdote.id === Number(singleAnecdoteMatch.params.id))
    : null

  const baseStyle = {
    fontFamily: "Helvetica, Verdana, Arial, sans-serif"
  }

  return (
    <div style={baseStyle}>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification message={notification} />
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/about" element={<About />} />
        <Route path="/createnew" element={<CreateNew addNew={addNew} />} />
        <Route path="/anecdotes/:id" element={<Anecdote anecdote={anecdote} />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
