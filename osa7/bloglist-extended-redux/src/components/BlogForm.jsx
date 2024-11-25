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

  const labelStyle = {
    width: 50,
  }

  return (
    <div className='blogForm' style={{ ...styles.paneWrapper, ...formWrapperStyle }}>
      <div style={styles.subTitle}>create new</div>
      <form style={{ ...styles.indentedContent, ...styles.form }} onSubmit={newBlogHandler}>
        <div style={styles.formFieldWrapper}>
          <label style={{ ...styles.formLabel, ...labelStyle }} htmlFor='title_field'>
            title
          </label>
          <input
            style={styles.formInput}
            id='title_field'
            type='text'
            value={newBlogTitle}
            name='newBlogTitle'
            data-testid='newBlogTitle'
            onChange={({ target }) => setNewBlogTitle(target.value)}
          />
        </div>
        <div style={styles.formFieldWrapper}>
          <label style={{ ...styles.formLabel, ...labelStyle }} htmlFor='author_field'>
            author
          </label>
          <input
            style={styles.formInput}
            id='author_field'
            type='text'
            value={newBlogAuthor}
            name='newBlogAuthor'
            data-testid='newBlogAuthor'
            onChange={({ target }) => setNewBlogAuthor(target.value)}
          />
        </div>
        <div style={styles.formFieldWrapper}>
          <label style={{ ...styles.formLabel, ...labelStyle }} htmlFor='URL_field'>
            URL
          </label>
          <input
            style={styles.formInput}
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
