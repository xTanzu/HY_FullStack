/** @format */

const initialState = null

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.payload
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

export const login = (user) => {
  return {
    type: 'LOGIN',
    payload: user,
  }
}

export const logout = () => {
  return {
    type: 'LOGOUT',
  }
}

export default loginReducer
