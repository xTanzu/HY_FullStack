import { gql } from '@apollo/client'

export const BOOK_COUNT = gql`
  query BookCount {
    bookCount
  }
`

export const AUTHOR_COUNT = gql`
  query AuthorCount {
    authorCount
  }
`

export const ALL_AUTHORS = gql`
  query AllAuthors {
    allAuthors {
      name
      born
      bookCount
      id  
    }
  }
`

export const ALL_BOOKS = gql`
  query AllBooks {
    allBooks {
      title
      author {
        name
      }
      published
    }
  }
`

export const ADD_BOOK = gql`
  mutation AddBook(
    $title: String!,
    $author: String!,
    $published: Int!,
    $genres: [String!]!
  ) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      author {
        name
      }
      published
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation EditAuthor(
    $name: String!,
    $born: Int!
  ) {
    editAuthor(
      name: $name,
      setBornTo: $born
    ) {
      name
      born
    }
  }
`
