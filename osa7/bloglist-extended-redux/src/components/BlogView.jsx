/** @format */

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import blogService from '../services/blogs'

import UserInfo from './UserInfo'

import { setSuccessMsg } from '../reducers/notificationReducer'
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
      handleAxiosException(exception)
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
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        likes: {blog.likes}
        <button onClick={() => handleLike(blog)}>like</button>
      </div>
      added by: {blog.user.name}
    </div>
  )
}

export default BlogWiew
