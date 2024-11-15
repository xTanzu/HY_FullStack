/** @format */

import { useState } from 'react'

import colors from '../constants/colors'
import styles from '../constants/styles'

const BlogForm = ({ handleNewBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogURL, setNewBlogURL] = useState('')

  const clearBlogForm = () => {
    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogURL('')
  }

  const newBlogHandler = async (event) => {
    event.preventDefault()
    const blog = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogURL,
    }
    const response = await handleNewBlog(blog)
    if (response.success === true) {
      clearBlogForm()
    }
  }

  const formWrapperStyle = {
    maxWidth: 400,
  }

  const formStyle = {
    margin: 10,
    display: 'flex',
    flexFlow: 'column nowrap',
    gap: 8,
  }

  const formFieldWrapperStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'flex-start',
  }

  const formLabelStyle = {
    width: 50,
    flexGrow: 1,
    // textAlign: 'center',
    // background: 'red',
  }

  const formInputStyle = {
    minWidth: 100,
    height: 20,
    flexGrow: 6,
    border: `1px ${colors.textAccent} solid`,
    borderRadius: 10,
    paddingLeft: 8,
    color: colors.textAccent,
  }

  return (
    <div className='blogForm' style={{ ...styles.paneWrapper, ...formWrapperStyle }}>
      <div style={styles.subTitle}>create new</div>
      <form style={{ ...styles.indentedContent, ...formStyle }} onSubmit={newBlogHandler}>
        <div style={formFieldWrapperStyle}>
          <label style={formLabelStyle} htmlFor='title_field'>
            title
          </label>
          <input
            style={formInputStyle}
            id='title_field'
            type='text'
            value={newBlogTitle}
            name='newBlogTitle'
            data-testid='newBlogTitle'
            onChange={({ target }) => setNewBlogTitle(target.value)}
          />
        </div>
        <div style={formFieldWrapperStyle}>
          <label style={formLabelStyle} htmlFor='author_field'>
            author
          </label>
          <input
            style={formInputStyle}
            id='author_field'
            type='text'
            value={newBlogAuthor}
            name='newBlogAuthor'
            data-testid='newBlogAuthor'
            onChange={({ target }) => setNewBlogAuthor(target.value)}
          />
        </div>
        <div style={formFieldWrapperStyle}>
          <label style={formLabelStyle} htmlFor='URL_field'>
            URL
          </label>
          <input
            style={formInputStyle}
            id='URL_field'
            type='text'
            value={newBlogURL}
            name='newBlogURL'
            data-testid='newBlogURL'
            onChange={({ target }) => setNewBlogURL(target.value)}
          />
        </div>
        <button style={styles.roundedBtn} type='submit' data-testid='submitNewBlog'>
          add
        </button>
      </form>
    </div>
  )
}

export default BlogForm
