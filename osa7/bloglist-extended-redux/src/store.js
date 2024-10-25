/** @format */

import { configureStore } from '@reduxjs/toolkit'

import loginReducer from './reducers/loginReducer'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
  reducer: {
    loggedInUser: loginReducer,
    notification: notificationReducer,
    blogs: blogReducer,
    users: userReducer,
  },
})

store.subscribe(() => {
  const storeNow = store.getState()
  // console.log(storeNow)
})

export default store
