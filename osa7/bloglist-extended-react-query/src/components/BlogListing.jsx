/** @format */

import { useRef, useContext } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'

import stateContext from '../context/stateContext'
import blogService from '../services/blogs'
import { queryClient } from '../queryStore'

import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable.jsx'
import Notification from './Notification'

import { login } from '../reducers/loginReducer'
import { setErrorMsg, setSuccessMsg } from '../reducers/notificationReducer'

const BlogListing = () => {
  const blogFormWrapper = useRef()
  const [state, stateDispatch] = useContext(stateContext)
  const loggedInUser = state.loggedInUser

  const blogs = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  })
  // blogs.isSuccess && console.log(blogs.data)

  const newBlogMutation = useMutation({
    mutationFn: blogService.post,
    onSuccess: (newBlog) => {
      const blogList = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogList.concat(newBlog))
    },
  })

  const likeBlogMutation = useMutation({
    mutationFn: blogService.like,
    onSuccess: (likedBlog) => {
      const blogList = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(
        ['blogs'],
        blogList.map((blog) => (blog.id !== likedBlog.id ? blog : likedBlog)),
      )
    },
  })

  const removeBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: (removedBlog) => {
      const blogList = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(
        ['blogs'],
        blogList.filter((blog) => blog.id !== removedBlog.id),
      )
    },
  })

  const logoutHandler = () => {
    stateDispatch(login(null))
    blogService.removeToken()
    window.localStorage.removeItem('loggedInUser')
  }

  const handleNewBlog = async ({ title, author, url }) => {
    const blog = { title, author, url }
    try {
      newBlogMutation.mutate(blog)
      blogFormWrapper.current.toggleVisible()
      stateDispatch(setSuccessMsg(`a new blog "${blog.title}" by ${blog.author} was added`))
      return { success: true }
    } catch (exception) {
      handleAxiosException(exception)
      return { success: false }
    }
  }

  const handleLike = async (blog) => {
    try {
      likeBlogMutation.mutate(blog)
      stateDispatch(setSuccessMsg(`liked blog "${blog.title}" by ${blog.author}`))
    } catch (exception) {
      handleAxiosException(exception)
    }
  }

  const handleRemove = async (blog) => {
    try {
      removeBlogMutation.mutate(blog)
      stateDispatch(setErrorMsg(`Deleted blog "${blog.title}" by ${blog.author}`))
    } catch (exception) {
      handleAxiosException(exception)
    }
  }

  const handleAxiosException = (exception) => {
    const handleResponseErrorCodes = (response) => {
      if (response.status === 401) {
        stateDispatch(setErrorMsg('not permitted'))
      } else if (response.status === 400) {
        stateDispatch(setErrorMsg(response.data.error))
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
        {blogs.isLoading && <div>Loading blogs...</div>}
        {blogs.isError && <div>Error loading data</div>}
        {blogs.isSuccess &&
          blogs.data
            .toSorted((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog key={blog.id} blog={blog} handleLike={handleLike} handleRemove={handleRemove} />
            ))}
      </div>
      <Togglable ref={blogFormWrapper} buttonLabel='New Blog'>
        <BlogForm handleNewBlog={handleNewBlog} />
      </Togglable>
      <Notification />
    </>
  )
}

export default BlogListing
