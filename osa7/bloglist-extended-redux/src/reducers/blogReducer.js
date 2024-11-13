/** @format */

import { createSlice } from '@reduxjs/toolkit'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogList: (state, action) => {
      return [...action.payload]
    },
    setBlog: (state, action) => {
      const updatedBlog = action.payload
      if (state.some((blog) => blog.id === updatedBlog.id)) {
        return state.map((blog) => (blog.id !== updatedBlog.id ? blog : updatedBlog))
      }
      return state.concat(updatedBlog)
    },
    addNewBlog: (state, action) => {
      return [...state, { ...action.payload }]
    },
    removeBlog: (state, action) => {
      const blogToRemove = action.payload
      return state.filter((blog) => blog.id !== blogToRemove.id)
    },
    // Täysin turhaa työtä..
    // addNewComment: (state, action) => {
    //   const blogToComment = action.payload.blog
    //   const comment = action.payload.comment
    //   return state.map((blog) =>
    //     blog.id !== blogToComment.id ? blog : { ...blog, comments: blog.comments.concat(comment) },
    //   )
    // },
  },
})

export const { setBlogList, setBlog, addNewBlog, removeBlog /*, addNewComment*/ } =
  blogSlice.actions

export default blogSlice.reducer
