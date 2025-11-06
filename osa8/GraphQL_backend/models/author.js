const mongoose = require('mongoose')

const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: [ true, 'author name has to be unique (\'{VALUE}\' already exists)' ],
    minlength: [ 4, 'author name is too short (\'{VALUE}\' is shorter than 4)' ]
  },
  born: {
    type: Number,
  },
})

schema.plugin(uniqueValidator)

module.exports = mongoose.model('Author', schema)
