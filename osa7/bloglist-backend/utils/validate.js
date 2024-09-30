const ValidationError = require("../errors/ValidationError")

const usernameAndPassword = ({ username, password }) => {
    if (!(username && password)) {
      throw new ValidationError("username and password required")
    }
    if (username.length < 3) {
      throw new ValidationError("username must be minimum of 3 characters long")
    }
    if (password.length < 3) {
      throw new ValidationError("password must be minimum of 3 characters long")
    }
}

module.exports = {
  usernameAndPassword
}
