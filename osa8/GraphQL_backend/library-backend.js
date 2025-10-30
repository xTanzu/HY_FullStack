const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')

const { v1: uuid_v1 } = require('uuid')

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
      if (!author) {
        author = new Author({ name: args.author })
        try {
           await author.save()
        } catch(exception) {
          throw new GraphQLError('Saving author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
              exception
            }
          })
        }
      }
      const book = new Book({ ...args, author: author.id })
      try {
        await book.save()
      } catch(exception) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            exception
          }
        })
      }
      return book.populate("author")
    },
    editAuthor: async (root, args) => {
      try {
        const updatedAuthor = await Author.findOneAndUpdate(
          { name: args.name }, 
          { born: args.setBornTo },
          { new: true }
        )
        return updatedAuthor
      } catch(exception) {
        throw new GraphQLError('Updating author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            exception
          }
        })
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
