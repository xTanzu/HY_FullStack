/** @format */

import { useReducer, createContext, useContext } from 'react'

import loginReducer from '../reducers/loginReducer'
import notificationReducer from '../reducers/notificationReducer'

const combinedReducer = (state, action) => {
  return {
    loggedInUser: loginReducer(state === undefined ? undefined : state.loggedInUser, action),
    notification: notificationReducer(state === undefined ? undefined : state.notification, action),
  }
}

const stateContext = createContext()

export const StateContextProvider = (props) => {
  const [state, stateDispatch] = useReducer(combinedReducer, combinedReducer(undefined, {}))

  return (
    <stateContext.Provider value={[state, stateDispatch]}>{props.children}</stateContext.Provider>
  )
}

export const useAppState = () => {
  const [state, stateDispatch] = useContext(stateContext)
  return state
}

export const useStateDispatch = () => {
  const [state, stateDispatch] = useContext(stateContext)
  return stateDispatch
}

export default stateContext
