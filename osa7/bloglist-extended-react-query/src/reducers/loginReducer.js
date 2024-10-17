/** @format */

import { createSlice } from '@reduxjs/toolkit'

const loginSlice = createSlice({
  name: 'loggedInUser',
  initialState: null,
  reducers: {
    login: (state, action) => {
      return action.payload
    },
  },
})

export const { login } = loginSlice.actions
export default loginSlice.reducer
