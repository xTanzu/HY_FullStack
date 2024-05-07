// import { useRef, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

// import { clearNotification } from "../reducers/notificationReducer.js"

const Notification = () => {

  // const dispatch = useDispatch()
  // const timeoutRef = useRef()
  const notification = useSelector(({ notification }) => notification)

  // useEffect(() => {
  //   if (notification.duration === null) {
  //     return
  //   }
  //   clearTimeout(timeoutRef.current)
  //   timeoutRef.current = setTimeout(() => {
  //     dispatch(clearNotification())
  //   }, notification.duration * 1000)
  //   return () => clearTimeout(timeoutRef.current) 
  // }, [notification])

  const style = {
    visibility: notification === "" ? "hidden" : "",
    border: 'solid 2px green',
    borderRadius: 10,
    padding: 10,
    fontFamily: "Helvetica",
    fontWeight: "bold",
    backgroundColor: "LightGreen",
    color: "green",
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
