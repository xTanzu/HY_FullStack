const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')

const jwt = require('jsonwebtoken')

const { GraphQLError } = require('graphql')

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const conf = require("dotenv").config()
require("dotenv-expand").expand(conf)

const mongoose = require("mongoose")

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log("error in connection to MongoDB:", err.message))


const typeDefs = `
  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
    title: String!
    published: Int!
    author: Author! 
    id: ID!
    genres: [String!]!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Query {
    me: User
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]
    allAuthors: [Author]!
  }

  type Mutation {
    addBook(
      title: String!, 
      author: String!, 
      published: Int!, 
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!,
      setBornTo: Int!
    ): Author
    createUser(
      username: String!,
      favouriteGenre: String!
    ): User
    login(
      username: String!,
      password: String!
    ): Token
  }
`

const extractMongoValidationErrorData = (err) => {
  const messages = Object.values(err.errors).map(err => err.properties.message)
  const invalidFields = Object.keys(err.errors)
  const invalidArgs = Object.values(err.errors).map(err => err.value)
  return { messages, invalidFields, invalidArgs }
}

const extractMongoDocumentNotFoundErrorData = (err) => {
  const messages = `Document with field '${Object.keys(err.filter)}' having value '${Object.values(err.filter)}' not found..`
  const invalidFields = Object.keys(err.filter)
  const invalidArgs = Object.values(err.filter)
  return { messages, invalidFields, invalidArgs }
}

const errorIfNotAuthenticated = (context) => {
  if (!context.currentUser) {
    throw new GraphQLError('Not signed in', {
      extensions: {
        code: 'BAD_USER_INPUT'
      }
    })
  }
}

const resolvers = {
  Query: {
    bookCount: async () => await Book.countDocuments(),
    authorCount: async () => await Author.countDocuments(),
    allBooks: async (root, args) => { 
      // pipeline pohja joka palauttaa kaikki kirjat populoituna
      let pipeline = [
        {
          $lookup: {
            from: "authors",
            localField: "author",
            foreignField: "_id",
            as: "author"
          }
        },
        { 
          $unwind: '$author'
        }
      ]

      // rakennetaan matcherilista vain niistä argumenteista jotka löytyvät (voi lisätä jopa lisää ehtoja)
      let matchers = []
      if (args.author) matchers.push({ 'author.name': args.author  })
      if (args.genre)  matchers.push({ 'genres': { $in: [args.genre] } })

      // Lisätään ehdot vain jos niitä on. Muuten palautetaan kaikki
      if (matchers.length > 0) {
        pipeline.push({ $match: { $or: matchers } })
      }

      return await Book.aggregate(pipeline)
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => {
      errorIfNotAuthenticated(context)
      return context.currentUser
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      errorIfNotAuthenticated(context)
      let author = await Author.findOne({ name: args.author })
      let addedNewAuthor = false
      if (!author) {
        author = new Author({ name: args.author })
        try {
          await author.save()
          addedNewAuthor = true
        } catch(exception) {
          if (exception.name === 'ValidationError') {
            console.error('Validation failed while saving new author', exception)
            let errorData = extractMongoValidationErrorData(exception)
            throw new GraphQLError('Author failed validation', {
              extensions: {
                code: 'BAD_USER_INPUT',
                ...errorData,
                exception
              }
            })
          } else {
            console.error('error occured while saving the new author', exception)
            throw new GraphQLError('Internal server error', {
              code: 'INTERNAL_SERVER_ERROR',
              cause: exception
            })
          }
        }
      }
      const book = new Book({ ...args, author: author.id })
      try {
        await book.save()
      } catch(exception) {
        if (addedNewAuthor) {
          const deletedAuthor = await Author.findByIdAndDelete(author.id)
          console.log(`deleted author ${deletedAuthor.id}`)
        }
        if (exception.name === 'ValidationError') {
          console.error('Validation failed while saving new book', exception)
          let errorData = extractMongoValidationErrorData(exception)
          throw new GraphQLError('Book failed validation', {
            extensions: {
              code: 'BAD_USER_INPUT',
              ...errorData,
              exception
            }
          })
        } else {
          console.error('error occured while saving the new book', exception)
          throw new GraphQLError('Internal server error', {
            code: 'INTERNAL_SERVER_ERROR',
            cause: exception
          })
        }
      }
      return book.populate("author")
    },
    editAuthor: async (root, args, context) => {
      errorIfNotAuthenticated(context)
      try {
        const updatedAuthor = await Author.findOneAndUpdate(
          { name: args.name }, 
          { born: args.setBornTo },
          { 
            new: true,
            runValidators: true
          }
        ).orFail()
        return updatedAuthor
      } catch(exception) {
        if (exception.name === 'ValidationError') {
          console.error('Validation failed while updating author', exception)
          let errorData = extractMongoValidationErrorData(exception)
          throw new GraphQLError('Author failed validation', {
            extensions: {
              code: 'BAD_USER_INPUT',
              ...errorData,
              exception
            }
          })
        } else if (exception.name === 'DocumentNotFoundError') {
          console.error('Author not found while update:', exception)
          let errorData = extractMongoDocumentNotFoundErrorData(exception)
          throw new GraphQLError('Author not found', {
            extensions: {
              code: 'BAD_USER_INPUT',
              ...errorData,
              exception
            }
          })
        } else {
          console.error('Error occured while updating the author', exception)
          throw new GraphQLError('Internal server error', {
            code: 'INTERNAL_SERVER_ERROR',
            cause: exception
          }) 
        }
      }
    },
    createUser: async (root, args) => {
      try {
        const user = new User({ username: args.username, favouriteGenre: args.favouriteGenre })
        await user.save()
        return user
      } catch(exception) {
        if (exception.name === 'ValidationError') {
          console.log('Validation failed while creating a new user')
          let errorData = extractMongoValidationErrorData(exception)
          throw new GraphQLError('User failed validation', {
            extensions: {
              code: 'BAD_USER_INPUT',
              ...errorData,
              exception
            }
          })
        } else {
          console.log('Error occured while creating user', exception)
          throw new GraphQLError('Internal server error', {
            code: 'INTERNAL_SERVER_ERROR',
            cause: exception
          })
        }
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'secret') {
        throw new GraphQLError('Wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }
      const userForToken = {
        username: user.username,
        id: user._id
      }
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    }
  },
  Author: {
    bookCount: async (root) => {
      const pipeline = [
        {
          $lookup: {
            from: 'authors',
            localField: 'author',
            foreignField: '_id',
            as: 'author'
          }
        },
        {
          $unwind: '$author'
        },
        {
          $match: {
            'author.name': root.name
          }
        },
        {
          $count: 'bookCount'
        }
      ]
      const result = await Book.aggregate(pipeline)
      return result[0].bookCount
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    let currentUser = null
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      try {
        const decodedToken = jwt.verify(auth.substr(7), process.env.JWT_SECRET)
        currentUser = await User.findById(decodedToken.id)
      } catch(exception) {
        console.error(exception)
        if (exception.name === 'JsonWebTokenError') {
          throw new GraphQLError('Connection not authorized', {
            code: 'BAD_CONNECTION_TOKEN'
          })
        } else {
          console.log('Error occured while extracting the access token', exception)
          throw new GraphQLError('Internal server error', {
            code: 'INTERNAL_SERVER_ERROR',
            cause: exception
          })
        }
      }
    }
    return { currentUser }
  }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
