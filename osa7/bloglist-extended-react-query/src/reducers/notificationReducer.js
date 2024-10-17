/** @format */

const initialState = {
  message: '',
  type: 'EMPTY',
}

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ERROR_MSG':
      return {
        message: action.payload,
        type: 'ERROR',
      }
    case 'SET_SUCCESS_MSG':
      return {
        message: action.payload,
        type: 'SUCCESS',
      }
    case 'CLEAR_NOTIFICATION':
      return {
        message: '',
        type: 'EMPTY',
      }
    default:
      return state
  }
}

export const setErrorMsg = (message) => {
  return {
    type: 'SET_ERROR_MSG',
    payload: message,
  }
}

export const setSuccessMsg = (message) => {
  return {
    type: 'SET_SUCCESS_MSG',
    payload: message,
  }
}

export const clearNotificationMsg = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  }
}

export default notificationReducer
