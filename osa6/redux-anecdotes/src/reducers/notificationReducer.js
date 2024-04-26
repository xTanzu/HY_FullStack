import  { createSlice } from "@reduxjs/toolkit"

// const initialState = "An initial dummy notification"

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    actionSetNotification(state, action) {
      return action.payload
    },
    actionClearNotification(state, action) {
      return ""
    }
  }
})

export const { actionSetNotification, actionClearNotification } = notificationSlice.actions
export default notificationSlice.reducer

