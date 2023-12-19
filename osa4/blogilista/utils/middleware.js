const logger = require("./logger")

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
  } else if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ error: "JSON webtoken not matching" })
  }

  next(err)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}

