import { render, screen } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import Blog from "./Blog"

describe("<Blog />", () => {

  const loggedInUser = {
    token: "madeuptoken123456789",
    user: {
      "username": "testuser",
      "name": "Test User",
      "id": "madeupid123456789"
    }
  }
  
  const testContent = {
    title: "Testing React components is very new to me",
    author: "Fullstack Student",
    url: "www.fakeurl.com",
    likes: 0,
    user: loggedInUser.user,
  }

  let mockLikeHandler
  let mockRemoveHandler

  let blogElement
  let user

  beforeEach(() => {
    mockLikeHandler = vi.fn()
    mockRemoveHandler = vi.fn()
    blogElement = render(
      <Blog blog={testContent} loggedInUser={loggedInUser} handleLike={mockLikeHandler} handleRemove={mockRemoveHandler} />
    )
    user = userEvent.setup()
  })

  test("initially Blog renders 'title' and 'author', but not 'URL' and 'likes'", () => {
    const titleElement = screen.getByText(new RegExp(testContent.title))
    expect(titleElement).toBeDefined()
    const authorElement = screen.getByText(new RegExp(testContent.author))
    expect(authorElement).toBeDefined()
    const urlElement = screen.queryByText(new RegExp(testContent.url))
    expect(urlElement).toBeNull()
    const likesElement = screen.queryByText(new RegExp(testContent.likes))
    expect(likesElement).toBeNull()
  })

  test("after clicking the show button 'title', 'author', 'URL' and 'likes' are rendered", async () => {
    const showButton = screen.getByTestId("toggleShowBtn")
    await user.click(showButton)
    const titlePara = screen.getByTestId("titleAndAuthor")
    const urlPara = screen.getByTestId("url")
    const likesPara = screen.getByTestId("likes")
    const userPara = screen.getByTestId("user")
    expect(titlePara).toHaveTextContent(testContent.title)
    expect(titlePara).toHaveTextContent(testContent.author)
    expect(urlPara).toHaveTextContent(testContent.url)
    expect(likesPara).toHaveTextContent(testContent.likes.toString())
    expect(userPara).toHaveTextContent(testContent.user.name)
  })

  test("clicking Blog-elements 'like' button twice makes two calls to the like eventHandler", async () => {
    const showButton = screen.getByTestId("toggleShowBtn")
    await user.click(showButton)
    const likeButton = screen.getByTestId("likeBtn")
    await user.click(likeButton)
    await user.click(likeButton)
    // Kumpikin näistä toimii
    expect(mockLikeHandler).toHaveBeenCalledTimes(2)
    expect(mockLikeHandler.mock.calls).toHaveLength(2)
  })

})
