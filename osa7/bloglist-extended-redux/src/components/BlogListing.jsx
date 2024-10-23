/** @format */

import { useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import blogService from '../services/blogs'
import UserInfo from './UserInfo'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable.jsx'
import { setErrorMsg, setSuccessMsg } from '../reducers/notificationReducer'
import { setBlogList, addNewBlog, removeBlog, updateBlog } from '../reducers/blogReducer'

const BlogListing = () => {
  const blogFormWrapper = useRef()
  const dispatch = useDispatch()
  const loggedInUser = useSelector((state) => state.loggedInUser)
  const blogs = useSelector((state) => state.blogs)

  useEffect(() => {
    updateBlogs()
  }, [])

  const updateBlogs = async () => {
    const updatedBlogs = await blogService.getAll()
    dispatch(setBlogList(updatedBlogs))
  }

  const handleNewBlog = async ({ title, author, url }) => {
    const blog = { title, author, url }
    try {
      const newBlog = await blogService.post(blog)
      dispatch(addNewBlog(newBlog))
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
      const likedBlog = await blogService.like(blog)
      dispatch(updateBlog(likedBlog))
      dispatch(setSuccessMsg(`liked blog "${blog.title}" by ${blog.author}`))
    } catch (exception) {
      handleAxiosException(exception)
    }
  }

  const handleRemove = async (blog) => {
    try {
      const removedBlog = await blogService.remove(blog)
      dispatch(removeBlog(removedBlog))
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
        <UserInfo />
        {blogs
          .toSorted((a, b) => b.likes - a.likes)
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
        <BlogForm handleNewBlog={handleNewBlog} />
      </Togglable>
    </>
  )
}

export default BlogListing
