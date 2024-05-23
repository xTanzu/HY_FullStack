import axios from 'axios'


const baseURL = 'http://localhost:3001'

const getAnecdotes = async () => {
  const response = await axios.get(`${baseURL}/anecdotes`)
  return response.data
}

export default { getAnecdotes }
