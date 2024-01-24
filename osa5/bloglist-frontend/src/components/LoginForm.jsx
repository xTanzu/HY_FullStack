import { useState, useRef, useEffect } from "react"
import { ErrorMessage, SuccessMessage } from "./Notification"
import loginService from "../services/login"

const LoginForm = ({ setLoggedInUser }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const errorTimeoutRef = useRef(null)
  const successTimeoutRef = useRef(null)

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem("loggedInUser")
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setLoggedInUser(user)
      // set the noteService token
    }
  }, [])

  const flashError = message => {
    clearTimeout(errorTimeoutRef.current)
    setErrorMessage(message)
    errorTimeoutRef.current = setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const flashSuccess = message => {
    clearTimeout(successTimeoutRef.current)
    setSuccessMessage(message)
    successTimeoutRef.current = setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        "loggedInUser", JSON.stringify(user)
      )
      setLoggedInUser(user)
      // set the noteService token
      flashSuccess("login succesful")
      setUsername("")
      setPassword("")
    } catch(exception) {
      if (exception.response.status === 401) {
        flashError("username or password incorrect")
      } else {
        throw exception
      }
    }
  }

  return (
    <div className="loginForm">
      <h2>Log into application</h2>
      <form onSubmit={ handleLogin }>
        <div>
          <label htmlFor="username_field">username</label>
          <input id="username_field" type="text" value={username} name="username" onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          <label htmlFor="password_field">password</label>
          <input id="password_field" type="password" value={password} name="password" onChange={({ target }) => setPassword(target.value)} />
        </div>        
        <button type="submit">login</button>
      </form>
      <ErrorMessage message={errorMessage} />
      <SuccessMessage message={successMessage} />
    </div>
  )
}

export default LoginForm
