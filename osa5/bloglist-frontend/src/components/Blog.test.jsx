import { render, screen } from "@testing-library/react"
import Blog from "./Blog"

test("renders title and author", () => {

  const loggedInUser = {
    token: "madeuptoken123456789",
    user: {
      "username": "testuser",
      "name": "Test User",
      "id": "madeupid123456789"
    }
  }

  const content = {
    title: "Testing React components is very new to me",
    author: "Fullstack Student",
    url: "www.fakeurl.com",
    likes: 0,
    user: loggedInUser.user,
  }

  render(<Blog blog={content} loggedInUser={loggedInUser} handleLike={() => {}} handleRemove={() => {}} />)

  const titleElement = screen.getByText(new RegExp(content.title))
  expect(titleElement).toBeDefined()
  const authorElement = screen.getByText(new RegExp(content.author))
  expect(authorElement).toBeDefined()
  const urlElement = screen.queryByText(new RegExp(content.url))
  expect(urlElement).toBeNull()
  const likesElement = screen.queryByText(new RegExp(content.likes))
  expect(likesElement).toBeNull()
})
