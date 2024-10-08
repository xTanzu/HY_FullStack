/** @format */

import { useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { clearNotificationMsg } from '../reducers/notificationReducer'

const Notification = () => {
  const dispatch = useDispatch()
  const { message, type } = useSelector((state) => state.notification)
  const timeoutRef = useRef(null)

  useEffect(() => {
    if (type != 'EMPTY') {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => {
        dispatch(clearNotificationMsg())
      }, 5000)
    }
    return () => clearTimeout(timeoutRef.current)
  }, [message])

  const style = {
    display: type === 'EMPTY' ? 'none' : 'block',
    padding: '10px',
    margin: '10px',
    borderWidth: '2px',
    borderColor: 'black',
    borderRadius: '10px',
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    background: type === 'SUCCESS' ? 'green' : 'RED',
    color: 'white',
  }

  return <div style={style}>{message}</div>
}

export default Notification
