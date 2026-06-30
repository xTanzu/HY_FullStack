import { useState, useEffect } from 'react'

import { 
  Routes,
  Route,
  Link,
  useNavigate
} from 'react-router-dom'

import { useQuery, useApolloClient } from '@apollo/client'
import { BOOK_COUNT, AUTHOR_COUNT } from './queries'

import { useNotification } from './context/NotificationContext'

import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import Recommendations from "./components/Recommendations"
import Login from "./components/Login"
import Notification from './components/Notification'

const App = () => {

  const [token, setToken] = useState(null)
  const { setError, setSuccess } = useNotification()
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      const tokenFromStorage = localStorage.getItem('books-user-token')
      if (tokenFromStorage) {
        setToken(tokenFromStorage)
      }
    }
  }, [])

  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setSuccess('uloskirjautuminen onnistui')
    navigate('/')
  }

  const bookResult = useQuery(BOOK_COUNT)
  const authorResult = useQuery(AUTHOR_COUNT)
  
  const bookCount = bookResult.loading ? 'loading' : bookResult.data.bookCount
  const authorCount = authorResult.loading ? 'loading' : authorResult.data.authorCount

  const linkStyle = {
    display: 'inline-block',
    padding: '2px 10px',
    margin: '2px 4px',
    boxSizing: 'content-box',
    width: '70px',
    height: '20px',
    lineHeight: 'normal',
    textAlign: 'center',
    background: 'none',
    color: '#888',
    border: '2px solid #888',
    borderRadius: 6,
    textDecoration: 'none'
  }

  return (
    <div>
      <h3>book count: {bookCount}</h3>
      <h3>author count: {authorCount}</h3>
        <div>
        <Link style={linkStyle} to="/">authors</Link>
        <Link style={linkStyle} to="/books">books</Link>
        { token && <Link style={linkStyle} to="/recommendations">recommend</Link> }
        { token && <Link style={linkStyle} to="/new">add book</Link> }
        { !token ? 
          <Link style={linkStyle} to="/login">login</Link> : 
          <button style={linkStyle} onClick={logout}>logout</button>
        }
      </div>

      <Routes>
        <Route path="/" element={<Authors/>} />
        <Route path="/books" element={<Books/>} />
        <Route path="/recommendations" element={<Recommendations/>} />
        <Route path="/new" element={<NewBook/>} />
        <Route path="/login" element={<Login setToken={setToken}/>} />
      </Routes>
      <Notification/>
    </div>
  );
};

export default App;
