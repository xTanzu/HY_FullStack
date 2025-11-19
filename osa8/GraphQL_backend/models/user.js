const mongoose = require('mongoose')

const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: [ true, 'username has to be unique (\'{VALUE}\' already exists)' ],
    minlength: [ 4, 'username is too short (\'{VALUE}\' is shorter than 4)' ]
  },
  favouriteGenre: {
    type: String,
    required: true,
  }
})

schema.plugin(uniqueValidator)

module.exports = mongoose.model('User', schema)
