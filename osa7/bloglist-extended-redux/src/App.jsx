/** @format */

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Navigate /*, useMatch*/ } from 'react-router-dom'

import LoginForm from './components/LoginForm'
import BlogListing from './components/BlogListing'
import Users from './components/Users'
import UserView from './components/UserView'
import BlogView from './components/BlogView'
import Notification from './components/Notification'

import { login } from './reducers/loginReducer'

const App = () => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)

  const loggedInUser = useSelector((state) => state.loggedInUser)

  const getUserFromStorage = () => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      dispatch(login(user))
    }
    setIsLoading(false)
  }

  useEffect(getUserFromStorage, [dispatch])

  // const match = useMatch("/user/:id")
  // const user = match ? vai haetaanko vasta näkymässä?

  if (isLoading) {
    return <div>Loading..</div>
  }

  const appWrapper = {
    width: '60%',
    margin: 'auto',
    // background: 'red',
    fontFamily: 'Helvetica, Arial, Sans-Serif',
  }

  return (
    <div style={appWrapper}>
      <Routes>
        <Route path='/login' element={<LoginForm />} />
        <Route
          path='/'
          element={loggedInUser ? <BlogListing /> : <Navigate replace to='/login' />}
        />
        <Route
          path='/users'
          element={loggedInUser ? <Users /> : <Navigate replace to='/login' />}
        />
        <Route
          path='/user/:id'
          element={loggedInUser ? <UserView /> : <Navigate replace to='/login' />}
        />
        <Route
          path='/blog/:id'
          element={loggedInUser ? <BlogView /> : <Navigate replace to='/login' />}
        />
      </Routes>
      <Notification />
    </div>
  )
}

export default App
