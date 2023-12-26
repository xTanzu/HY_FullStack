const config = require("./utils/config")
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require("./controllers/blogs")
const usersRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")
const middleware = require("./utils/middleware")
const logger = require("./utils/logger")
const mongoose = require('mongoose')

mongoose.connect(config.MONGODB_URI)
  .then(() => logger.info("Connected to MongoDB"))
  .catch(err => logger.error("error in connection to MongoDB:", err.message))

app.use(cors())
app.use(middleware.bearerTokenExtractor)
app.use(express.json())
app.use(middleware.requestLogger)

app.post("/api/blogs", middleware.userExtractor)
app.delete("/api/blogs/*", middleware.userExtractor)
app.use("/api/blogs", blogsRouter)
app.use("/api/users", usersRouter)
app.use("/api/login", loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
