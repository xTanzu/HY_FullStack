import  { createSlice } from "@reduxjs/toolkit"

import { notify } from "../reducers/notificationReducer.js"

import anecdoteService from "../services/anecdotes"

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
    // actionVoteForAnecdote(state, action) {
    //   const id = action.payload.id
    //   const anecdoteToChange = state.find(anecdote => anecdote.id === id)
    //   const votedAnecdote = {
    //     ...anecdoteToChange,
    //     votes: anecdoteToChange.votes + 1
    //   }
    //   return state.map(anecdote => {
    //     return anecdote.id !== id ? anecdote : votedAnecdote 
    //   })
    // },
    actionAppendAncdote(state, action) {
      return [...state, action.payload]
    },
    actionSetAnecdotes(state, action) {
      return action.payload
    },
    actionSetAnecdote(state, action) {
      const updatedAnecdote = action.payload
      return state.map(anecdote => {
        return anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote
      })
    }
  }
})

export const { /*actionVoteForAnecdote,*/ actionAppendAncdote, actionSetAnecdotes, actionSetAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(actionSetAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch(actionAppendAncdote(anecdote))
    const notificationMessage = `You created "${anecdote.content}"`
    dispatch(notify(notificationMessage, 6))
  }
}

export const voteForAnecdote = (id) => {
  return async (dispatch) => {
    const votedAnecdote = await anecdoteService.voteFor(id)
    dispatch(actionSetAnecdote(votedAnecdote))
    const notificationMessage = `You voted "${votedAnecdote.content}"`
    dispatch(notify(notificationMessage, 4))
  }
}





















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
