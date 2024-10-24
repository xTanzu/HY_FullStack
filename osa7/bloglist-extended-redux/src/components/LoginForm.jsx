/** @format */

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { setErrorMsg, setSuccessMsg } from '../reducers/notificationReducer'
import { login } from '../reducers/loginReducer'

import loginService from '../services/login'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      dispatch(login(user))
      dispatch(setSuccessMsg('login succesful'))
      setUsername('')
      setPassword('')
      navigate('/')
    } catch (exception) {
      if (exception.response.status === 401) {
        dispatch(setErrorMsg('username or password incorrect'))
      } else {
        throw exception
      }
    }
  }

  const loginWrapperStyle = {
    width: '60%',
    padding: '20px',
    margin: 'auto',
    marginTop: '50vh',
    transform: 'translate3d(0,-50%,0)',
    background: 'lightgrey',
  }

  const headingStyle = {
    textAlign: 'center',
  }

  const formStyle = {
    display: 'flex',
    flexFlow: 'column nowrap',
    gap: 10,
    alignItems: 'center',
    // background: 'green',
  }

  return (
    <div className='loginWrapper' style={loginWrapperStyle}>
      <h2 style={headingStyle}>Log into application</h2>
      <form onSubmit={handleLogin} style={formStyle}>
        <div>
          <label htmlFor='username_field'>username</label>
          <input
            id='username_field'
            data-testid='username_field'
            type='text'
            value={username}
            name='username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label htmlFor='password_field'>password</label>
          <input
            id='password_field'
            data-testid='password_field'
            type='password'
            value={password}
            name='password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm
