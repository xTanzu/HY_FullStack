/** @format */

import { useSelector } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'

import LoginForm from './components/LoginForm'
import BlogListing from './components/BlogListing'
import Notification from './components/Notification'

const App = () => {
  const loggedInUser = useSelector((state) => state.loggedInUser)

  return (
    <div>
      <Routes>
        <Route path='/login' element={<LoginForm />} />
        <Route
          path='/'
          element={loggedInUser ? <BlogListing /> : <Navigate replace to='/login' />}
        />
      </Routes>
      <Notification />
    </div>
  )
}

export default App
