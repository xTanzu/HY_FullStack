/** @format */

import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUserList: (state, action) => {
      return [...action.payload]
    },
    setUser: (state, action) => {
      const updatedUser = action.payload
      if (state.some((user) => user.id === updatedUser.id)) {
        return state.map((user) => (user.id !== updatedUser.id ? user : updatedUser))
      }
      return state.concat(updatedUser)
    },
  },
})

export const { setUserList, setUser } = userSlice.actions

export default userSlice.reducer
