/** @format */

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import userService from '../services/users'

import UserInfo from './UserInfo'

import { setUserList } from '../reducers/userReducer'

import colors from '../constants/colors'
import styles from '../constants/styles'

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)

  useEffect(() => {
    updateUsers()
  }, [dispatch])

  const updateUsers = async () => {
    const updatedUsers = await userService.getAll()
    dispatch(setUserList(updatedUsers))
  }

  const tableStyle = {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: '0 10px',
  }

  const theadStyle = {
    background: colors.textGrey,
    color: colors.mainWhite,
  }

  const rowStyle = {
    // lineHeight: 2,
    textIndent: 16,
    borderBottom: '1px solid #aaa',
    background: colors.mainWhite,
    color: colors.textGrey,
  }

  const usernameStyle = {
    padding: '10px 40px',
    textAlign: 'center',
    borderRadius: '10px 0 0 10px',
    fontWeight: 'bold',
  }

  const blogsCreatedStyle = {
    padding: '10px 40px',
    textAlign: 'center',
    borderRadius: '0 10px 10px 0',
    fontWeight: 'bold',
  }

  return (
    <div>
      <h1 style={styles.title}>Users</h1>
      <UserInfo />
      <table style={tableStyle}>
        <thead>
          <tr style={{ ...rowStyle, ...theadStyle }}>
            <th style={usernameStyle}>username</th>
            <th style={blogsCreatedStyle}>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.id} style={rowStyle}>
                <td style={usernameStyle}>
                  <Link to={`/user/${user.id}`}>{user.name}</Link>
                </td>
                <td style={blogsCreatedStyle}>{user.blogs.length}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Users
