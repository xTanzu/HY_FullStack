const usersRouter = require("express").Router()
const User = require("../models/user")
const bcrypt = require("bcrypt")
const validate = require("../utils/validate")

usersRouter.get("/", async (request, response, next) => {
  try {
    const users = await User.find({})
    response
      .status(200)
      .json(users)
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
