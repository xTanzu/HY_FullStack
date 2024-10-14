/** @format */

import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'

import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'

import App from './App'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
  },
})

store.subscribe(() => {
  const storeNow = store.getState()
  // console.log(storeNow)
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
