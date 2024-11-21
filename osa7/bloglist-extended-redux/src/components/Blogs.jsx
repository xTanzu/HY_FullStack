/** @format */

import { useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import blogService from '../services/blogs'
import errorHandlingService from '../services/errorHandling'

import UserInfo from './UserInfo'
import BlogListing from './BlogListing'
import BlogForm from './BlogForm'
import Togglable from './Togglable.jsx'
import { setErrorMsg, setSuccessMsg } from '../reducers/notificationReducer'
import { setBlogList, addNewBlog } from '../reducers/blogReducer'

import colors from '../constants/colors'
import styles from '../constants/styles'

const Blogs = () => {
  const blogFormWrapper = useRef()
  const dispatch = useDispatch()
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
      errorHandlingService.handleAxiosException(exception)
      // Miten tämän voisi muuttaa promiseksi
      return { success: false }
    }
  }

  const listingWrapperStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  }

  return (
    <>
      <div className='blogListing'>
        <h1 style={styles.title}>Blogs</h1>
        <UserInfo />
        <div className='listingWrapper' style={listingWrapperStyle}>
          <BlogListing blogs={blogs} />
          <Togglable ref={blogFormWrapper} buttonLabel='New Blog'>
            <BlogForm handleNewBlog={handleNewBlog} />
          </Togglable>
        </div>
      </div>
    </>
  )
}

export default Blogs
