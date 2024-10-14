/** @format */

import { createSlice } from '@reduxjs/toolkit'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogList: (state, action) => {
      return [...action.payload]
    },
    addNewBlog: (state, action) => {
      return [...state, { ...action.payload }]
    },
  },
})

export const { setBlogList, addNewBlog } = blogSlice.actions

export default blogSlice.reducer
