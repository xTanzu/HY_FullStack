const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')

const { GraphQLError } = require('graphql')

const Book = require('./models/book')
const Author = require('./models/author')

const conf = require("dotenv").config()
require("dotenv-expand").expand(conf)

const mongoose = require("mongoose")

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log("error in connection to MongoDB:", err.message))


const typeDefs = `
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
    allAuthors: async () => Author.find({})
  },
  Mutation: {
    addBook: async (root, args) => {
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
          console.error('validation failed while saving new book', exception)
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
    editAuthor: async (root, args) => {
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
          console.error('validation failed while updating author', exception)
          let errorData = extractMongoValidationErrorData(exception)
          throw new GraphQLError('Author failed validation', {
            extensions: {
              code: 'BAD_USER_INPUT',
              ...errorData,
              exception
            }
          })
        } else if (exception.name === 'DocumentNotFoundError') {
          console.error('author not found while update', exception)
          let errorData = extractMongoDocumentNotFoundErrorData(exception)
          throw new GraphQLError('Author not found', {
            extensions: {
              code: 'BAD_USER_INPUT',
              ...errorData,
              exception
            }
          })
        } else {
          console.error('error occured while updating the author', exception)
          throw new GraphQLError('Internal server error', {
            code: 'INTERNAL_SERVER_ERROR',
            cause: exception
          }) 
        }
      }
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
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
