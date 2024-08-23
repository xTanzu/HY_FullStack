import { useContext, useEffect } from 'react'
import NotificationContext from '../NotificationContext'

const Notification = () => {

  const [notificationMessage, notificationDispatch] = useContext(NotificationContext)

  const style = {
    visibility: notificationMessage === "" ? "hidden" : "visible",
    display: "block",
    width: "max-content",
    border: 'solid 2px black',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    fontFamily: "helvetica, sans-serif",
    marginBottom: 5,
    color: "white",
    background: "DimGray",
  }

  useEffect(() => {
    if (notificationMessage !== "") {
      const clearOutTimer = setTimeout(() => {
        notificationDispatch({ type: "CLEAR" })
      }, 5000)
      return () => {clearTimeout(clearOutTimer)}
    }
  }, [notificationMessage])
  
  // if (true) return null

  return (
    <div style={style}>
      { notificationMessage }
    </div>
  )
}

export default Notification
