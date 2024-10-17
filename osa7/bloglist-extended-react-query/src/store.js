/** @format */

import { configureStore } from '@reduxjs/toolkit'

import loginReducer from './reducers/loginReducer'
import blogReducer from './reducers/blogReducer'

const store = configureStore({
  reducer: {
    loggedInUser: loginReducer,
    blogs: blogReducer,
  },
})

store.subscribe(() => {
  const storeNow = store.getState()
  // console.log(storeNow)
})

export default store
