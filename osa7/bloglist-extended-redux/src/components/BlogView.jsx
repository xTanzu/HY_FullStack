/** @format */

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import blogService from '../services/blogs'

import UserInfo from './UserInfo'
import Blog from './Blog'
import Comments from './Comments'

import { setBlog } from '../reducers/blogReducer'

import colors from '../constants/colors'
import styles from '../constants/styles'

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

  const blogWrapperStyle = {
    background: 'none',
    // background: colors.lightGrey,
  }

  if (blog === null) {
    return <div>loading..</div>
  }

  return (
    <div>
      <h2 style={styles.title}>{blog.title}</h2>
      <UserInfo />
      <div style={{ ...styles.paneWrapper, ...blogWrapperStyle }}>
        <Blog blog={blog} isExpandable={false} />
        <Comments blog={blog} />
      </div>
    </div>
  )
}

export default BlogWiew
