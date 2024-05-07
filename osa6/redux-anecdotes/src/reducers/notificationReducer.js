import  { createSlice } from "@reduxjs/toolkit"

// const initialState = "An initial dummy notification"

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    actionSetNotification(state, action) {
      return action.payload
    }
  }
})

export const { actionSetNotification } = notificationSlice.actions
export default notificationSlice.reducer

export const notify = (message, duration=5) => {
  return (dispatch) => {
    dispatch(actionSetNotification({ message, duration }))
  }
}

export const clearNotification = () => {
  return (dispatch) => {
    dispatch(actionSetNotification({ message: "", duration: null }))
  }
}
