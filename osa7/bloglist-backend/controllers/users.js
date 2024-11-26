const usersRouter = require("express").Router()
const User = require("../models/user")
const bcrypt = require("bcrypt")
const validate = require("../utils/validate")
const logger = require("../utils/logger")

usersRouter.get("/", async (request, response, next) => {
  try {
    const users = await User.find({}).populate("blogs", {id: 1, title: 1, author: 1, url: 1, likes: 1, user: 1, comments: 1})
    response
      .status(200)
      .json(users)
  } catch(exception) {
    next(exception)
  }
})

usersRouter.get("/:id", async (request, response, next) => {
  try {
    const user = await User.findById(request.params.id).populate("blogs", {id: 1, title: 1, author: 1, url: 1, likes: 1, user: 1, comments: 1})
    console.log(user)
    response
      .status(200)
      .json(user)
  } catch(exception) {
    next(exception)
  }
})

usersRouter.post("/", async (request, response, next) => {
  try {
    const { username, name, password } = request.body

    validate.usernameAndPassword({ username, password })

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      passwordHash
    })

    savedUser = await user.save()
    
    response
      .status(201)
      .json(savedUser)
  } catch(exception) {
    // console.log(exception)
    next(exception)
  }
})

module.exports = usersRouter
