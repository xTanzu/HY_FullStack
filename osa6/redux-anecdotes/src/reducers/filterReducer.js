import  { createSlice } from "@reduxjs/toolkit"

const filterSlice = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    actionSetFilter(state, action) {
      return action.payload
    }
  }
})

export const { actionSetFilter } = filterSlice.actions
export default filterSlice.reducer

















// HERE JUST FOR REFERENCE

// const filterReducer = (state="", action) => {
//   switch(action.type) {
//     case "SET_FILTER":
//       return action.payload
//     default:
//       return state
//   }
// }

// export const actionSetFilter = (filter) => {
//   return {
//     type: "SET_FILTER",
//     payload: filter
//   }
// }

// export default filterReducer
