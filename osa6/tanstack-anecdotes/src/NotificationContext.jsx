import { createContext, useReducer, useContext } from 'react'

const emptyNotification = { message: "", state: "CLEARED" }

const notificationReducer =  (state, action) => {
  switch(action.type) {
    case "VOTED":
      return { message: `Anecdote "${action.payload}" voted`, state: "SUCCESS" }
    case "NEW":
      return { message: `Anecdote "${action.payload}" created`, state: "SUCCESS" }
    case "ERROR":
      return { message: action.payload, state: "ERROR" }
    case "CLEAR":
      return emptyNotification
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, emptyNotification)

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}> 
      {props.children}
    </NotificationContext.Provider> 
  )
}

export default NotificationContext
