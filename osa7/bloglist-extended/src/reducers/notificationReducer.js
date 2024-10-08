/** @format */

const initialState = {
  message: '',
  type: 'EMPTY',
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ERROR_MSG':
      return {
        message: action.message,
        type: 'ERROR',
      }
    case 'SET_SUCCESS_MSG':
      return {
        message: action.message,
        type: 'SUCCESS',
      }
    case 'CLEAR_MSG':
      return initialState
    default:
      return state
  }
}

export const setErrorMsg = (message) => {
  return {
    type: 'SET_ERROR_MSG',
    message,
  }
}

export const setSuccessMsg = (message) => {
  return {
    type: 'SET_SUCCESS_MSG',
    message,
  }
}

export const clearNotificationMsg = () => {
  return {
    type: 'CLEAR_MSG',
  }
}

export default notificationReducer
