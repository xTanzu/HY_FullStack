const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  try {
    const blog = new Blog(request.body)
    savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  } catch(exception) {
    next(error)
  }
})

module.exports = blogsRouter
