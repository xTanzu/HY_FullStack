import { useEffect } from "react"

const Info = ({message, disable}) => {
  return <Notification message={message} disable={disable} type="info"/>
}

const Alert = ({message, disable}) => {
  return <Notification message={message} disable={disable} type="alert"/>
}

const Notification = ({ message, disable, type }) => {

  if (message === null) {
    return null
  }

  useEffect(() => {
    setTimeout(() => {
      disable()
    }, 5000)
  }, [])

  return (
    <div className={`notification ${type}`}>
      {message}
    </div>
  )
}

export { Info, Alert }
