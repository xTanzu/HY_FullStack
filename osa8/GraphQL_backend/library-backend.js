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


let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conexión con el libro
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'Demons',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

/*
  you can remove the placeholder query once your first one has been implemented 
*/

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

// KAIKKI POIS KOMMENTOITU KOODI ON VANHA PAIKALLINEN TAPA HAKEA DATAA. UUSI VERSIO HAKEE MONGODB:STÄ
// POISTETAAN KUN KAIKKI VALMIIT
const resolvers = {
  Query: {
    // bookCount: () => books.length,
    bookCount: async () => await Book.countDocuments(),
    // authorCount: () => authors.length,
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
    // allAuthors: () => authors
    allAuthors: async () => Author.find({})
  },
  Mutation: {
    // addBook: (root, args) => {
    //   const newBook = (({ title, author, published, genres }) => ({ title, author, published, genres }))(args)
    //   const bookExists = books.some(book => book.title === newBook.title)
    //   if (bookExists) {
    //     throw new GraphQLError('Book must be unique', {
    //       extensions: {
    //         code: 'BAD_USER_INPUT',
    //         invalidArgs: args.title
    //       }
    //     })
    //   }
    //   books = books.concat(newBook)
    //   const authorExists = authors.some(author => author.name === newBook.author)
    //   if (!authorExists) {
    //     const newAuthor = { 
    //       name: newBook.author,
    //       id: uuid_v1(),
    //       born: null
    //     }
    //     authors = authors.concat(newAuthor)
    //     console.log(newAuthor)
    //   }
    //   return newBook
    // },
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
      // const foundAuthor = authors.find(author => author.name === args.name)
      // if (!foundAuthor) {
      //   console.log("author not found")
      //   return null
      // }
      // console.log("author found, updating")
      // const updatedAuthor = { ...foundAuthor, born: Number(args.setBornTo) }
      // authors = authors.map(author => author.name !== args.name ? author : updatedAuthor)
      // return updatedAuthor

      // const foundAuthor = Author.findOne({name: args.name})
      // if (!foundAuthor) {
      //   console.log('author not found')
      //   return null
      // }
      // console.log('author found, updating')

      try {
        const updatedAuthor = await Author.findOneAndUpdate(
          { name: args.name }, 
          { born: args.setBornTo },
          { new: true }
        )
        console.log(updatedAuthor)
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
    bookCount: (root) => books.filter(book => book.author == root.name).length
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
