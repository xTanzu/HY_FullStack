import { createContext, useReducer, useContext } from 'react'

const notificationReducer =  (state, action) => {
  switch(action.type) {
    case "VOTED":
      return `Anecdote "${action.payload}" voted`
    case "NEW":
      return `Anecdote "${action.payload}" created`
    case "CLEAR":
      return ""
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notificationMessage, notificationDispatch] = useReducer(notificationReducer, "")

  return (
    <NotificationContext.Provider value={[notificationMessage, notificationDispatch]}> 
      {props.children}
    </NotificationContext.Provider> 
  )
}

export default NotificationContext
