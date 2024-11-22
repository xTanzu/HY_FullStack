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

  const blogsTitleStyle = {
    color: colors.mainWhite,
  }

  if (user === null) {
    return <div>loading..</div>
  }

  // sisään tulevan blogin id ei jotenkin näy kun blogia tykkää, jokin meni rikki. Katso miltä Blog objekti näyttää sisältä

  return (
    <div>
      <h1 style={styles.title}>{user.name}</h1>
      <UserInfo />
      <div className='listingWrapper' style={{ ...styles.paneWrapper, ...listingWrapperStyle }}>
        <h2 style={{ ...styles.title, ...blogsTitleStyle }}>added blogs</h2>
        <BlogListing blogs={user.blogs} />
      </div>
    </div>
  )
}

export default UserView
