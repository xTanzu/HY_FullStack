/** @format */

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import blogService from '../services/blogs'

import UserInfo from './UserInfo'
import CommentForm from './CommentForm'

import { setSuccessMsg, setErrorMsg } from '../reducers/notificationReducer'
import { setBlog } from '../reducers/blogReducer'

const BlogWiew = () => {
  const id = useParams().id
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const blog = blogs.some((blog) => blog.id === id)
    ? blogs.filter((blog) => blog.id === id)[0]
    : null

  useEffect(() => {
    updateBlog()
  }, [dispatch])

  const updateBlog = async () => {
    const updatedBlog = await blogService.getById(id)
    dispatch(setBlog(updatedBlog))
  }

  // Tää pitäis tuoda jostain ulkoota
  const handleLike = async (blog) => {
    try {
      const likedBlog = await blogService.like(blog)
      dispatch(setBlog(likedBlog))
      dispatch(setSuccessMsg(`liked blog "${blog.title}" by ${blog.author}`))
    } catch (exception) {
      dispatch(setErrorMsg(exception.message))
    }
  }

  const submitComment = async (blog, comment) => {
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

  if (blog === null) {
    return <div>loading..</div>
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <UserInfo />
      <div>
        <a href={blog.url} target='_blank'>
          {blog.url}
        </a>
      </div>
      <div>
        likes: {blog.likes}
        <button onClick={() => handleLike(blog)}>like</button>
      </div>
      added by: {blog.user.name}
      <div>
        <h3>comments:</h3>
        <CommentForm blog={blog} submitComment={submitComment} />
        <ul>
          {blog.comments &&
            blog.comments.map((comment, indx) => (
              <li key={`${blog.id}.comment[${indx}]`}>{comment}</li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default BlogWiew
