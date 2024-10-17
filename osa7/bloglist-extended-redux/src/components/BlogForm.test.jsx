/** @format */

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm.jsx'

describe('<BlogForm />', () => {
  const inputData = {
    title: 'Test Title',
    author: 'Test Author',
    url: 'www.testurl.com/notarealblog',
  }

  let mockAddNewBlogHandler
  let blogFormElement
  let user

  beforeEach(() => {
    mockAddNewBlogHandler = vi.fn()
    blogFormElement = render(<BlogForm addNewBlog={mockAddNewBlogHandler} />)
    user = userEvent.setup()
  })

  test('form calls the callback given to it with correct content, and empties the fields', async () => {
    mockAddNewBlogHandler.mockReturnValue({ success: true })

    const titleInput = screen.getByTestId('newBlogTitle')
    const authorInput = screen.getByTestId('newBlogAuthor')
    const urlInput = screen.getByTestId('newBlogURL')
    const submitBtn = screen.getByTestId('submitNewBlog')
    await user.type(titleInput, inputData.title)
    await user.type(authorInput, inputData.author)
    await user.type(urlInput, inputData.url)
    await user.click(submitBtn)

    expect(mockAddNewBlogHandler).toHaveBeenCalledTimes(1)
    expect(mockAddNewBlogHandler.mock.calls[0][0]).toEqual(inputData)

    expect(titleInput.value).toHaveLength(0)
    expect(authorInput.value).toHaveLength(0)
    expect(urlInput.value).toHaveLength(0)
  })

  test('form does not empty the fields if the handling is not succesful', async () => {
    mockAddNewBlogHandler.mockReturnValue({ success: false })

    const titleInput = screen.getByTestId('newBlogTitle')
    const authorInput = screen.getByTestId('newBlogAuthor')
    const urlInput = screen.getByTestId('newBlogURL')
    const submitBtn = screen.getByTestId('submitNewBlog')
    await user.type(titleInput, inputData.title)
    await user.type(authorInput, inputData.author)
    await user.type(urlInput, inputData.url)
    await user.click(submitBtn)

    expect(mockAddNewBlogHandler).toHaveBeenCalledTimes(1)
    expect(mockAddNewBlogHandler.mock.calls[0][0]).toEqual(inputData)

    expect(titleInput.value).toHaveLength(inputData.title.length)
    expect(authorInput.value).toHaveLength(inputData.author.length)
    expect(urlInput.value).toHaveLength(inputData.url.length)
  })
})
