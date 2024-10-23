/** @format */

import { useRef, useEffect, useContext } from 'react'

import stateContext from '../context/stateContext'

import { clearNotificationMsg } from '../reducers/notificationReducer'

const Notification = () => {
  const [state, stateDispatch] = useContext(stateContext)
  const { message, type } = state.notification
  const timeoutRef = useRef(null)

  useEffect(() => {
    if (type != 'EMPTY') {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => {
        stateDispatch(clearNotificationMsg())
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
