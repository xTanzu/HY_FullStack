import { createStore, combineReducers } from "redux"


import anecdoteReducer from "./reducers/anecdoteReducer"
import filterReducer from "./reducers/filterReducer"

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  filter: filterReducer,
})

export const store = createStore(reducer)
