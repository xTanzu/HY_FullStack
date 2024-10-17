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
    removeBlog: (state, action) => {
      const blogToRemove = action.payload
      return state.filter((blog) => blog.id !== blogToRemove.id)
    },
    updateBlog: (state, action) => {
      const updatedBlog = action.payload
      return state.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
      // Tää toimii, mutta poista nappi häviää kun blogista on tykätty, palaa vasta kun päivittää sivun, mistä johtuu?
    },
  },
})

export const { setBlogList, addNewBlog, removeBlog, updateBlog } = blogSlice.actions

export default blogSlice.reducer
