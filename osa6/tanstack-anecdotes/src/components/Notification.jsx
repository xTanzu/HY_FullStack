import { useContext, useEffect } from 'react'
import NotificationContext from '../NotificationContext'

const Notification = () => {

  const [notification, notificationDispatch] = useContext(NotificationContext)

  const notificationColor = { 
    "SUCCESS": "green",
    "ERROR": "red",
    "CLEARED": ""
  }

  const style = {
    visibility: notification.state === "CLEARED" ? "hidden" : "visible",
    display: "block",
    width: "max-content",
    border: 'solid 2px black',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    fontFamily: "helvetica, sans-serif",
    marginBottom: 5,
    color: "white",
    background: notificationColor[notification.state],
  }

  useEffect(() => {
    if (notification.state !== "CLEARED") {
      const clearOutTimer = setTimeout(() => {
        notificationDispatch({ type: "CLEAR" })
      }, 5000)
      return () => {clearTimeout(clearOutTimer)}
    }
  }, [notification])
  
  // if (true) return null

  return (
    <div style={style}>
      { notification.message}
    </div>
  )
}

export default Notification
