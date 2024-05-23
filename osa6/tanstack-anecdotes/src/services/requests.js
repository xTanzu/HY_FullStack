import axios from 'axios'


const baseURL = 'http://localhost:3001'

const getAnecdotes = async () => {
  const response = await axios.get(`${baseURL}/anecdotes`)
  return response.data
}

const postAnecdote = async (anecdote) => {
  const response = await axios.post(`${baseURL}/anecdotes`, anecdote)
  return response.data
}

export default { getAnecdotes, postAnecdote }
