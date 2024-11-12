class RequestFormatError extends Error {
  constructor(message) {
    super(message)
    this.name = "RequestFormatError"
  }
}

module.exports = RequestFormatError
