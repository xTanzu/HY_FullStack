/** @format */

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'

import userService from '../services/users'

import UserInfo from './UserInfo'

import { setUser } from '../reducers/userReducer'

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

  if (user === null) {
    return <div>loading..</div>
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <UserInfo />
      <h4>added blogs</h4>
      <ul>
        {user.blogs.map((blog) => {
          return (
            <li key={blog.id}>
              <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default UserView
