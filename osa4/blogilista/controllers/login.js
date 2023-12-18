const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const loginRouter = require("express").Router()
const User = require("../models/user")

loginRouter.post("/", async (request, response, next) => {
  try {
    const { username, password } = request.body

    if (!(username && password)) {
      return response
        .status(401)
        .json({
          error: "username or password is missing"
        })
    }

    const user = await User.findOne({ username })
    const passwordIsCorrect = user === null
      ? false
      : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordIsCorrect)) {
      return response
        .status(401)
        .json({
          error: "invalid username or password"
        })
    }

    const userForToken = {
      username: user.username,
      id: user._id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    response
      .status(200)
      .json({ token, username: user.username, name: user.name })
  } catch(exception) {
    console.log(exception)
    next(exception)
  }
})

module.exports = loginRouter
