const blogsRouter = require("express").Router()
const User = require("../models/user")
const Blog = require("../models/blog")

blogsRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate("user", { username: 1, name: 1, id: 1 })
    response
      .status(200)
      .json(blogs)
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.post("/", async (request, response, next) => {
  try {
    const { title, author, url, likes } = { ...request.body }
    // const user = await User.findById(body.userId)
    const users = await User.find({})
    const user = users[0]
    const blog = new Blog({
      title,
      author,
      url,
      likes: likes ? likes : 0,
      user: user._id,
    })
    savedBlog = await blog.save()
    response
      .status(201)
      .json(savedBlog)
    user.blogs = user.blogs.concat(savedBlog)
    await user.save()
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
