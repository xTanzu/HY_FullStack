import { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import { useMutation } from '@apollo/client'

import { LOGIN } from '../queries.js'

import { useNotification } from '../context/NotificationContext'

const Login = ({ setToken }) => {

  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { setError, setSuccess } = useNotification()

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(`Kirjautuminen epäonnistui: ${error.message}`)
      setError(`Kirjautuminen epäonnistui: ${error.message}`)
    },
    onCompleted: () => {
      console.log('kirjautuminen onnistui')
      setSuccess('Kirjautuminen onnistui')
      navigate('/')
    }
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('books-user-token', token)
    }
  }, [result.data])

  const submit = async (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            value={password}
            type="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
