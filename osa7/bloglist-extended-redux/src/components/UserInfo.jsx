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
    // background: 'red',
  }

  const linkStyle = {
    margin: '0 10px',
    padding: '5px 10px',
    border: '2px solid black',
    borderRadius: 8,
    textDecoration: 'none',
    color: 'black',
    background: 'lightgrey',
  }

  const linkWrapperStyle = {
    // padding: '10px 20px',
    // border: '2px solid black',
    // borderRadius: 8,
  }

  const loggerCtrlStyle = {
    display: 'flex',
    gap: 20,
    padding: '0 10px',
    // background: 'lightgrey',
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
          <div>{loggedInUser ? `${loggedInUser.user.name} logged in` : ''}</div>
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
