/** @format */

import { useDispatch, useSelector } from 'react-redux'
import { login } from '../reducers/loginReducer'

const UserInfo = () => {
  const dispatch = useDispatch()
  const loggedInUser = useSelector((state) => state.loggedInUser)

  const logoutHandler = () => {
    dispatch(login(null))
    window.localStorage.removeItem('loggedInUser')
  }

  return (
    <>
      <br />
      <div>
        {loggedInUser ? `${loggedInUser.user.name} logged in` : ''}
        <button className='logoutBtn' onClick={logoutHandler}>
          logout
        </button>
      </div>
      <br />
    </>
  )
}

export default UserInfo
