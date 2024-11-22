/** @format */

import { useDispatch } from 'react-redux'

import blogService from '../services/blogs'
import errorHandlingService from '../services/errorHandling'

import { setErrorMsg, setSuccessMsg } from '../reducers/notificationReducer'
import { setBlog, removeBlog } from '../reducers/blogReducer'

export const useModifyBlog = () => {
  const dispatch = useDispatch()

  const like = async (blog) => {
    try {
      const likedBlog = await blogService.like(blog)
      dispatch(setBlog(likedBlog))
      dispatch(setSuccessMsg(`liked blog "${blog.title}" by ${blog.author}`))
    } catch (exception) {
      errorHandlingService.handleAxiosException(exception)
    }
  }

  const comment = async (blog, comment) => {
    try {
      const commentedBlog = await blogService.comment(blog, comment)
      dispatch(setBlog(commentedBlog))
      dispatch(setSuccessMsg(`commented blog "${blog.title}"`))
      return true
    } catch (exception) {
      dispatch(setErrorMsg(exception.message))
      return false
    }
  }

  const remove = async (blog) => {
    try {
      const removedBlog = await blogService.remove(blog)
      dispatch(removeBlog(removedBlog))
      dispatch(setErrorMsg(`Deleted blog "${blog.title}" by ${blog.author}`))
    } catch (exception) {
      errorHandlingService.handleAxiosException(exception)
    }
  }

  return { like, comment, remove }
}
