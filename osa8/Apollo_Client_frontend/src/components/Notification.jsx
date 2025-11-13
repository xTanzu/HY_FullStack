import { useContext, useEffect, useRef } from 'react'

import notificationContext, { clearNotification } from '../context/NotificationContext'

const Notification = (props) => {

  const { notificationData, notificationDispatch } = useContext(notificationContext)
  const { message, type } = notificationData
  const timeoutRef = useRef(null)

  useEffect(() => {
    if (type != 'EMPTY') {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => {
        notificationDispatch(clearNotification())
      }, 5000)
    }
    return () => clearTimeout(timeoutRef.current)
  }, [message])

  const style = {
    display: type === 'EMPTY' ? 'none' : 'block',
    width: 'fit-content',
    padding: '14px',
    margin: '10px',
    borderWidth: '2px',
    borderColor: 'black',
    borderRadius: '10px',
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    background: type === 'SUCCESS' ? 'green' : 'RED',
    color: 'white'
  }

  return (
    <div style={style}>{message}</div>
  )

}

export default Notification
