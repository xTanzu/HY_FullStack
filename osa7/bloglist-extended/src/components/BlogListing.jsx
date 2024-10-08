/** @format */

import { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import blogService from '../services/blogs'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable.jsx'
import Notification from './Notification'
import { setErrorMsg, setSuccessMsg } from '../reducers/notificationReducer'

const BlogListing = ({ loggedInUser, setLoggedInUser }) => {
  const [blogs, setBlogs] = useState([])
  const blogFormWrapper = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    updateBlogs()
  }, [])

  const updateBlogs = async () => {
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }

  const logoutHandler = () => {
    setLoggedInUser(null)
    window.localStorage.removeItem('loggedInUser')
  }

  const addNewBlog = async ({ title, author, url }) => {
    const blog = { title, author, url }
    try {
      const response = await blogService.post(blog)
      updateBlogs()
      blogFormWrapper.current.toggleVisible()
      dispatch(setSuccessMsg(`a new blog "${blog.title}" by ${blog.author} was added`))
      return { success: true }
    } catch (exception) {
      handleAxiosException(exception)
      // Miten tämän voisi muuttaa promiseksi
      return { success: false }
    }
  }

  const handleLike = async (blog) => {
    try {
      const response = await blogService.like(blog)
      updateBlogs()
      dispatch(setSuccessMsg(`liked blog "${blog.title}" by ${blog.author}`))
    } catch (exception) {
      handleAxiosException(exception)
    }
  }

  const handleRemove = async (blog) => {
    try {
      const response = await blogService.remove(blog)
      updateBlogs()
      dispatch(setErrorMsg(`Deleted blog "${blog.title}" by ${blog.author}`))
    } catch (exception) {
      handleAxiosException(exception)
    }
  }

  const handleAxiosException = (exception) => {
    const handleResponseErrorCodes = (response) => {
      if (response.status === 401) {
        dispatch(setErrorMsg('not permitted'))
      } else if (response.status === 400) {
        dispatch(setErrorMsg(response.data.error))
      } else {
        throw exception
      }
    }
    if (exception.response) {
      handleResponseErrorCodes(exception.response)
    } else {
      throw exception
    }
  }

  return (
    <>
      <div className='blogListing'>
        <h2>blogs</h2>
        <br />
        <div>
          {loggedInUser ? `${loggedInUser.user.name} logged in` : ''}
          <button className='logoutBtn' onClick={logoutHandler}>
            logout
          </button>
        </div>
        <br />
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              loggedInUser={loggedInUser}
              handleLike={handleLike}
              handleRemove={handleRemove}
            />
          ))}
      </div>
      <Togglable ref={blogFormWrapper} buttonLabel='New Blog'>
        <BlogForm addNewBlog={addNewBlog} />
      </Togglable>
      <Notification />
    </>
  )
}

export default BlogListing
