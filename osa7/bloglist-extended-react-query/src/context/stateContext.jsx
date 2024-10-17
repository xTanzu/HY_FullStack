/** @format */

import { useReducer, createContext, useContext } from 'react'

import notificationReducer from '../reducers/notificationReducer'

const stateContext = createContext()

export const StateContextProvider = (props) => {
  const [state, stateDispatch] = useReducer(notificationReducer, {})

  return (
    <stateContext.Provider value={[state, stateDispatch]}>{props.children}</stateContext.Provider>
  )
}

export const useState = () => {
  const [state, stateDispatch] = useContext(stateContext)
  return state
}

export const useStateDispatch = () => {
  const [state, stateDispatch] = useContext(stateContext)
  return stateDispatch
}

export default stateContext
