import { useEffect } from "react"

const Notification = ({ message, disableMessage }) => {

  if (message === null) {
    return null
  }

  useEffect(() => {
    setTimeout(() => {
      disableMessage()
    }, 5000)
  }, [])

  return (
    <div className="notification">
      {message}
    </div>
  )
}

export default Notification
