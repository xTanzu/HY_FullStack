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

let timeoutRef = null

export const notify = (message, duration=5) => {
  return (dispatch) => {

    if (timeoutRef) {
      clearTimeout(timeoutRef)
    }
    timeoutRef = setTimeout(() => {
      dispatch(actionSetNotification(""))
      timeoutRef = null
    }, duration * 1000)

    dispatch(actionSetNotification(message))
  }
}

