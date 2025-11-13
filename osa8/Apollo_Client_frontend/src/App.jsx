import { 
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom'

import { useQuery } from '@apollo/client'
import { BOOK_COUNT, AUTHOR_COUNT } from './queries'

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notification from './components/Notification'

const App = () => {

  const bookResult = useQuery(BOOK_COUNT)
  const authorResult = useQuery(AUTHOR_COUNT)
  
  const bookCount = bookResult.loading ? 'loading' : bookResult.data.bookCount
  const authorCount = authorResult.loading ? 'loading' : authorResult.data.authorCount

  const padding = {
    padding: 5
  }

  return (
    <div>
      <h3>book count: {bookCount}</h3>
      <h3>author count: {authorCount}</h3>
      <Router>
        <div>
          <Link style={padding} to="/">authors</Link>
          <Link style={padding} to="/books">books</Link>
          <Link style={padding} to="/new">add book</Link>
        </div>

        <Routes>
          <Route path="/" element={<Authors/>} />
          <Route path="/books" element={<Books/>} />
          <Route path="/new" element={<NewBook/>} />
        </Routes>
      </Router>
      <Notification/>
    </div>
  );
};

export default App;
