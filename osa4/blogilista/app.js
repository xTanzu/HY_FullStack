const config = require("./utils/config")
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require("./controllers/blogs")
const middleware = require("./utils/middleware")
const logger = require("./utils/logger")
const mongoose = require('mongoose')

mongoose.connect(config.MONGODB_URI)
  .then(() => logger.info("Connected to MongoDB"))
  .catch(err => logger.error("error in connection to MongoDB:", err.message))

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use("/api/blogs", blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
