/** @format */

import { useDispatch, useSelector } from 'react-redux'

import blogService from '../services/blogs'
import errorHandlingService from '../services/errorHandling'

import Blog from './Blog'

import { setErrorMsg, setSuccessMsg } from '../reducers/notificationReducer'
import { setBlog, removeBlog } from '../reducers/blogReducer'

const BlogListing = ({ blogs }) => {
  const dispatch = useDispatch()

  const handleLike = async (blog) => {
    try {
      const likedBlog = await blogService.like(blog)
      dispatch(setBlog(likedBlog))
      dispatch(setSuccessMsg(`liked blog "${blog.title}" by ${blog.author}`))
    } catch (exception) {
      errorHandlingService.handleAxiosException(exception)
    }
  }

  const handleRemove = async (blog) => {
    try {
      const removedBlog = await blogService.remove(blog)
      dispatch(removeBlog(removedBlog))
      dispatch(setErrorMsg(`Deleted blog "${blog.title}" by ${blog.author}`))
    } catch (exception) {
      errorHandlingService.handleAxiosException(exception)
    }
  }

  return (
    <>
      {blogs
        .toSorted((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} handleLike={handleLike} handleRemove={handleRemove} />
        ))}
    </>
  )
}

export default BlogListing
