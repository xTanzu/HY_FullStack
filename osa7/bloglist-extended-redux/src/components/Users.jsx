/** @format */

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import userService from '../services/users'

import UserInfo from './UserInfo'

import { setUserList } from '../reducers/userReducer'

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
    borderCollapse: 'collapse',
  }

  const rowStyle = {
    borderBottom: '1px solid #aaa',
  }

  const dataStyle = {
    textAlign: 'center',
  }

  return (
    <div>
      <h2>Users</h2>
      <UserInfo />
      <table style={tableStyle}>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.id} style={rowStyle}>
                <td>{user.name}</td>
                <td style={dataStyle}>{user.blogs.length}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Users
