/** @format */

import axios from 'axios'

import store from '../store'

const baseUrl = '/api/blogs'

const getToken = () => {
  const token = `Bearer ${store.getState().loggedInUser.token}`
  return token
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const post = async (blog) => {
  const config = {
    headers: { Authorization: getToken() },
  }
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const like = async (blog) => {
  const config = {
    headers: { Authorization: getToken() },
  }
  blog = {
    ...blog,
    likes: blog.likes + 1,
    user: blog.user.id,
  }
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config)
  return response.data
}

const remove = async (blog) => {
  const config = {
    headers: { Authorization: getToken() },
  }
  const response = await axios.delete(`${baseUrl}/${blog.id}`, config)
  return response.data
}

export default { getAll, getById, post, like, remove }
