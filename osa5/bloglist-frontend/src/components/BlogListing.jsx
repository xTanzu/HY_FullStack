import { useState, useRef, useEffect } from "react"

import blogService from "../services/blogs"
import Blog from "./Blog"
import BlogForm from "./BlogForm"
import Togglable from "./Togglable.jsx"
import { ErrorMessage, SuccessMessage } from "./Notification"

const BlogListing = ({ loggedInUser, setLoggedInUser }) => {
  const [blogs, setBlogs] = useState([])

  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const errorTimeoutRef = useRef(null)
  const successTimeoutRef = useRef(null)

  useEffect(() => {
    updateBlogs()
  }, [])

  const updateBlogs = async () => {
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }

  const logoutHandler = () => {
    setLoggedInUser(null)
    window.localStorage.removeItem("loggedInUser")
  }

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


  const addNewBlog = async ({ title, author, url }) => {
    const blog = { title, author, url }

    try {
      const response = await blogService.post(blog)
      updateBlogs()
      flashSuccess(`a new blog "${blog.title}" by ${blog.author} was added`)
    } catch(exception) {
      if (exception.response.status === 401) {
        flashError("not permitted")
      } else if (exception.response.status === 400) {
        flashError(exception.response.data.error)
      } else {
        throw exception
      }
    }
  }

  const handleLike = async ({ blog }) => {
    try {
      const response = await blogService.like(blog)
      updateBlogs()
      flashSuccess(`liked blog "${blog.title}" by ${blog.author}`)
    } catch(exception) {
      if (exception.response.status === 401) {
        flashError("not permitted")
      } else if (exception.response.status === 400) {
        flashError(exception.response.data.error)
      } else {
        throw exception
      }
    }
  }

  return (
    <>
      <div className="blogListing">
        <h2>blogs</h2>
        <br/>
        <div>
          {loggedInUser ? `${loggedInUser.user.name} logged in` : ""}
          <button onClick={logoutHandler}>logout</button>
        </div>
        <br/>
        {blogs.sort((a,b) => b.likes - a.likes).map(blog =>
          <Blog key={blog.id} blog={blog} handleLike={handleLike} />
        )}
      </div>
      <Togglable buttonLabel="New Note">
        <BlogForm addNewBlog={addNewBlog} />
      </Togglable>      
      <ErrorMessage message={errorMessage} />
      <SuccessMessage message={successMessage} />
    </>
  )
}

export default BlogListing
