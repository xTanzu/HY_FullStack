import axios from "axios"

const baseurl = "http://localhost:3001/anecdotes"

const getAll = async () => {
  const response = await axios.get(baseurl)
  return response.data
}

const createNew = async (content) => {
  const anecdoteObject = { content, votes: 0 }
  const response = await axios.post(baseurl, anecdoteObject)
  return response.data
}

const voteFor = async (id) => {
  const url = `${baseurl}/${id}`
  const response = await axios.get(url)
  const anecdote = response.data
  const votedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
  const responseAfterVote = await axios.put(url, votedAnecdote)
  return responseAfterVote.data
}

export default { getAll, createNew, voteFor }
