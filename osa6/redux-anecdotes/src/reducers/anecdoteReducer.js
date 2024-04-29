import  { createSlice } from "@reduxjs/toolkit"

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (content) => {
  return {
    content,
    id: getId(),
    votes: 0
  }
}

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    actionVoteForAnecdote(state, action) {
      const id = action.payload.id
      const anecdoteToChange = state.find(anecdote => anecdote.id === id)
      const votedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote => {
        return anecdote.id !== id ? anecdote : votedAnecdote 
      })
    },
    actionAppendAncdote(state, action) {
      return [...state, action.payload]
    },
    actionSetAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { actionVoteForAnecdote, actionAppendAncdote, actionSetAnecdotes} = anecdoteSlice.actions
export default anecdoteSlice.reducer























// HERE JUST FOR REFERENCE

// const reducer = (state = initialState, action) => {
//   switch(action.type) {
//     case "VOTE_ANECDOTE":
//       const id = action.payload.id
//       const anecdoteToChange = state.find(anecdote => anecdote.id === id)
//       const votedAnecdote = {
//         ...anecdoteToChange,
//         votes: anecdoteToChange.votes + 1
//       }
//       return state.map(anecdote => {
//         return anecdote.id !== id ? anecdote : votedAnecdote 
//       })
//     case "ADD_NEW_ANECDOTE":
//       const newAnecdote = asObject(action.payload.content)
//       return [...state, newAnecdote]
//     default:
//       return state
//   }

//   return state
// }

// export const actionVoteForAnecdote = (id) => {
//   return {
//     type: "VOTE_ANECDOTE",
//     payload: { id }
//   }
// }

// export const actionAddNewAnecdote = (content) => {
//   return {
//     type: "ADD_NEW_ANECDOTE",
//     payload: { content }
//   }
// }

// export default reducer
