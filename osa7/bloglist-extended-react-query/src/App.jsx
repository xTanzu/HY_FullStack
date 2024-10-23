/** @format */

import { useAppState } from './context/stateContext'

import LoginForm from './components/LoginForm'
import BlogListing from './components/BlogListing'

const App = () => {
  const state = useAppState()
  const loggedInUser = state.loggedInUser

  return (
    <div>
      {!loggedInUser && <LoginForm />}
      {loggedInUser && <BlogListing />}
    </div>
  )
}

export default App
