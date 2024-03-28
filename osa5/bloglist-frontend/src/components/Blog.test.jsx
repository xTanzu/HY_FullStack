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

  const mockLikeHandler = vi.fn()
  const mockRemoveHandler = vi.fn()

  let blogElement

  beforeEach(() => {
    blogElement = render(
      <Blog blog={testContent} loggedInUser={loggedInUser} handleLike={mockLikeHandler} handleRemove={mockRemoveHandler} />
    ).container
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
    const user = userEvent.setup()
    const showButton = screen.getByText("show")
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

})
