/** @format */

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'

import userService from '../services/users'

import UserInfo from './UserInfo'
import BlogListing from './BlogListing'

import { setUser } from '../reducers/userReducer'

import colors from '../constants/colors'
import styles from '../constants/styles'

const UserView = () => {
  const id = useParams().id
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)
  const user = users.some((user) => user.id === id)
    ? users.filter((user) => user.id === id)[0]
    : null
  const usersBlogs = useSelector((state) => state.blogs.filter((blog) => blog.user.id === id))

  useEffect(() => {
    updateUser()
  }, [dispatch])

  const updateUser = async () => {
    const updatedUser = await userService.getById(id)
    dispatch(setUser(updatedUser))
  }

  const listingWrapperStyle = {
    background: colors.lightGrey,
  }

  if (user === null) {
    return <div>loading..</div>
  }

  return (
    <div>
      <h1 style={styles.title}>{user.name}</h1>
      <UserInfo />
      <div className='listingWrapper' style={{ ...styles.paneWrapper, ...listingWrapperStyle }}>
        <BlogListing blogs={usersBlogs} title={'added blogs'} />
      </div>
    </div>
  )
}

export default UserView
