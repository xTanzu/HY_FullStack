const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

blogsRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
    response
      .status(200)
      .json(blogs)
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.post("/", async (request, response, next) => {
  try {
    const blog = new Blog(request.body)
    savedBlog = await blog.save()
    response
      .status(201)
      .json(savedBlog)
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)
    response
      .status(204)
      .end()
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.put("/:id", async (request, response, next) => {
  try {
    updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body)
    response
      .status(200)
      .json(updatedBlog)
  } catch(exception) {
    next(exception)
  }
})

module.exports = blogsRouter
