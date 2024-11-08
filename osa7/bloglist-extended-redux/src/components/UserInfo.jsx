/** @format */

import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { login } from '../reducers/loginReducer'

const UserInfo = () => {
  const dispatch = useDispatch()
  const loggedInUser = useSelector((state) => state.loggedInUser)

  const logoutHandler = () => {
    dispatch(login(null))
    window.localStorage.removeItem('loggedInUser')
  }

  const wrapperStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    background: 'grey',
  }

  const linkStyle = {
    padding: '5px 40px',
    border: '2px solid black',
    borderRadius: 8,
    textDecoration: 'none',
    color: 'black',
    background: 'lightgrey',
  }

  const linkWrapperStyle = {
    padding: 5,
    display: 'flex',
    gap: 20,
  }

  const loggerCtrlStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
    padding: '0 10px',
    // background: 'red',
  }

  const loggedInStyle = {
    color: 'white',
    fontWeight: 'bold',
  }

  return (
    <>
      <br />
      <div className='user_info_wrapper' style={wrapperStyle}>
        <div className='link_wrapper' style={linkWrapperStyle}>
          <Link style={linkStyle} to='/'>
            Blogs
          </Link>
          <Link style={linkStyle} to='/users'>
            Users
          </Link>
        </div>
        <div className='logged_ctrl' style={loggerCtrlStyle}>
          <div style={loggedInStyle}>
            {loggedInUser ? `${loggedInUser.user.name} logged in` : ''}
          </div>
          <button className='logoutBtn' onClick={logoutHandler}>
            logout
          </button>
        </div>
      </div>
      <br />
    </>
  )
}

export default UserInfo
