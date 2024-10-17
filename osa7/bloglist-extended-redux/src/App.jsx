/** @format */

import { useSelector } from 'react-redux'

import LoginForm from './components/LoginForm'
import BlogListing from './components/BlogListing'

const App = () => {
  const loggedInUser = useSelector((state) => state.loggedInUser)

  return (
    <div>
      {!loggedInUser && <LoginForm />}
      {loggedInUser && <BlogListing />}
    </div>
  )
}

export default App
