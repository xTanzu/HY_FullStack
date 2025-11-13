import { useReducer, createContext, useContext } from 'react'

const initialState = {
  type: 'EMPTY',
  message: ''
}

const notificationReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'SET_ERROR_MSG':
      return { ...state,
        type: 'ERROR',
        message: action.payload,
      }
    case 'SET_SUCCESS_MSG':
      return { ...state,
        type: 'SUCCESS',
        message: action.payload,
      }
    case 'CLEAR_NOTIFICATION':
      return initialState
    default:
      return state
  }
}

const notificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notificationData, notificationDispatch] = useReducer(notificationReducer, notificationReducer())

  return (
    <notificationContext.Provider value={{notificationData, notificationDispatch}}>{props.children}</notificationContext.Provider>
  )
}

export const setErrorMsg = (message) => {
  return {
    type: 'SET_ERROR_MSG',
    payload: message
  }
}

export const setSuccessMsg = (message) => {
  return {
    type: 'SET_SUCCESS_MSG',
    payload: message
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}

export const useNotificationDispatch = () => {
  const { notificationDispatch } = useContext(notificationContext)
  return notificationDispatch
}

export default notificationContext
