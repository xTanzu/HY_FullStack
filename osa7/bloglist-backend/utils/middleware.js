const logger = require("./logger")
const jwt = require("jsonwebtoken")
const User = require("../models/user")

const requestLogger = (req, res, next) => {
  logger.info("Method:", req.method)
  logger.info("Path:", req.path)

  logger.info("Body:", req.body.password === undefined 
    ? req.body 
    : { 
      ...req.body, 
      password: req.body.password.replaceAll( /./g , "*" ) 
    })
  logger.info("---")
  next()
}

const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: "unknown endpoint" })
}

const errorHandler = (err, req, res, next) => {
  logger.error(err.message)

  if (err.name === "CastError") {
    return res.status(400).json({ error: "malformatted id" })
  } else if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message })
  } else if (err.name === "MongoServerError" && err.code === 11000) {
    const key = Object.keys(err.keyValue)[0]
    const value = err.keyValue[key]
    return res.status(400).json({ error: `"${value}" as ${key} is already taken` })
  } else if (err.name === "AuthorizationError") {
    return res.status(401).json({ error: "user not identified, authorization required" })
  } else if (err.name === "RequestFormatError") {
    return res.status(400).json({ error: "malformatted request" })
  }

  next(err)
}

const bearerTokenExtractor = (req, res, next) => {
  const authHeader = req.get("Authorization")
  if (authHeader && authHeader.startsWith("Bearer ")) {
    req.token = authHeader.replace("Bearer ", "")
  } else {
    req.token = null
  }
  next()
}

const userExtractor = async (req, res, next) => {
  if (req.token === null) {
    req.user = null
    // return response.status(401).json({ error: "token missing" })
    next()
  }
  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    req.user = await User.findById(decodedToken.id)
    next()
  } catch(exception) {
    logger.error("cannot extract user from token")
    req.user = null
    next()
  }
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  bearerTokenExtractor,
  userExtractor
}

