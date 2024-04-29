import  { createSlice } from "@reduxjs/toolkit"

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (content) => {
  return {
    content,
    id: getId(),
    votes: 0
  }
}

// const initialState = anecdotesAtStart.map(asObject)

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
    // Tämä on käytännössä sama kuin Append, poista tämä kun turvallista
    actionAddNewAnecdote(state, action) {
      const newAnecdote = asObject(action.payload.content)
      return [...state, newAnecdote]
    },
    actionAppendAncdote(state, action) {
      return [...state, action.payload]
    },
    actionSetAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { actionVoteForAnecdote, actionAddNewAnecdote, actionAppendAncdote, actionSetAnecdotes} = anecdoteSlice.actions
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
