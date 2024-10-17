/** @format */

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: '',
  type: 'EMPTY',
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setErrorMsg: (state, action) => {
      return {
        message: action.payload,
        type: 'ERROR',
      }
    },
    setSuccessMsg: (state, action) => {
      return {
        message: action.payload,
        type: 'SUCCESS',
      }
    },
    clearNotificationMsg: () => {
      return {
        message: '',
        type: 'EMPTY',
      }
    },
  },
})

export const { setErrorMsg, setSuccessMsg, clearNotificationMsg } = notificationSlice.actions

export default notificationSlice.reducer
