/** @format */

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { setErrorMsg, setSuccessMsg } from '../reducers/notificationReducer'
import { login } from '../reducers/loginReducer'

import loginService from '../services/login'

import colors from '../constants/colors'
import styles from '../constants/styles'

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
  }

  const headingStyle = {
    textAlign: 'center',
  }

  const formStyle = {
    // display: 'flex',
    // flexFlow: 'column nowrap',
    // gap: 10,
    alignItems: 'center',
    // background: 'green',
  }

  const labelStyle = {
    width: 80,
  }

  const buttonStyle = {
    width: '50%',
  }

  return (
    <div className='loginWrapper' style={{ ...styles.paneWrapper, ...loginWrapperStyle }}>
      <h2 style={{ ...styles.title, ...headingStyle }}>Log into application</h2>
      <form onSubmit={handleLogin} style={{ ...styles.form, ...formStyle }}>
        <div style={styles.formFieldWrapper}>
          <label style={{ ...styles.formLabel, ...labelStyle }} htmlFor='username_field'>
            username
          </label>
          <input
            style={styles.formInput}
            id='username_field'
            data-testid='username_field'
            type='text'
            value={username}
            name='username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div style={styles.formFieldWrapper}>
          <label style={{ ...styles.formLabel, ...labelStyle }} htmlFor='password_field'>
            password
          </label>
          <input
            style={styles.formInput}
            id='password_field'
            data-testid='password_field'
            type='password'
            value={password}
            name='password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button style={{ ...styles.roundedBtn, ...buttonStyle }} type='submit'>
          login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
