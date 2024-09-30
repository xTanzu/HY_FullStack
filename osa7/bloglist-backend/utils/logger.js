const info = (...params) => {
  if (true || process.env.NODE_ENV !== "test") {
    console.log(...params)
  }
}

const error = (...params) => {
  if (true || process.env.NODE_ENV !== "test") {
    console.log(...params)
  }
}

module.exports = {
  info, error
}
