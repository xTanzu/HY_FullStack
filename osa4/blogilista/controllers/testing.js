const testingRouter = require("express").Router()
const User = require("../models/user")
const Blog = require("../models/blog")
const logger = require("../utils/logger")

testingRouter.post("/reset", async (request, response) => {
  logger.info("resetting test database")
  await User.deleteMany({})
  await Blog.deleteMany({})
  logger.info("reset done")
  response.status(204).end()
})

module.exports = testingRouter
