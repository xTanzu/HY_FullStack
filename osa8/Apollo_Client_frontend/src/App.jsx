import { 
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom'

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";

const App = () => {
  const padding = {
    padding: 5
  }

  return (
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
  );
};

export default App;
