/** @format */

import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import colors from '../constants/colors'
import styles from '../constants/styles'

const Blog = ({ blog, handleLike, handleRemove }) => {
  const loggedInUser = useSelector((state) => state.loggedInUser)
  const [isExpanded, setIsExpanded] = useState(false)

  const usersOwn = blog.user ? loggedInUser.user.id === blog.user.id : false

  const toggleExpand = (event) => {
    setIsExpanded(!isExpanded)
  }

  const confirmRemove = () => {
    if (window.confirm(`Delete "${blog.title}" for good?`)) {
      handleRemove(blog)
    }
  }

  const blogFieldStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    // background: 'red',
  }

  const titleAndAuthorWrapperStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  }

  const authorStyle = {
    marginLeft: 6,
  }

  const smallTextStyle = {
    fontSize: 14,
  }

  const buttonWrapperStyle = {
    justifyContent: 'flex-start',
  }

  const likeButtonStyle = {
    background: colors.likeBtnBlue,
  }

  const removeButtonStyle = {
    marginLeft: 10,
    background: 'fireBrick',
  }

  return (
    <div className='blogItemWrapper' style={styles.paneWrapper}>
      <div data-testid='titleAndAuthor' style={blogFieldStyle}>
        <div style={titleAndAuthorWrapperStyle}>
          <Link to={`/blog/${blog.id}`} style={styles.subTitle}>
            {blog.title}
          </Link>
          <div style={{ ...styles.indentedContent, ...authorStyle }}>{blog.author}</div>
        </div>
        <button style={styles.roundedBtn} data-testid='toggleShowBtn' onClick={toggleExpand}>
          {isExpanded ? 'hide' : 'show'}
        </button>
      </div>

      {isExpanded && (
        <div
          data-testid='url'
          style={{ ...blogFieldStyle, ...styles.indentedContent, ...smallTextStyle }}
        >
          <a href={blog.url} target='_blank'>
            {blog.url}
          </a>
        </div>
      )}
      {isExpanded && (
        <div
          data-testid='likes'
          style={{ ...blogFieldStyle, ...styles.indentedContent, ...smallTextStyle }}
        >
          likes: {blog.likes}
        </div>
      )}
      {isExpanded && (
        <div
          data-testid='user'
          style={{ ...blogFieldStyle, ...styles.indentedContent, ...smallTextStyle }}
        >
          {blog.user ? blog.user.name : 'user not defined'}
        </div>
      )}
      {isExpanded && (
        <div style={{ ...blogFieldStyle, ...styles.indentedContent, ...buttonWrapperStyle }}>
          <button
            style={{ ...styles.roundedBtn, ...likeButtonStyle }}
            data-testid='likeBtn'
            onClick={() => {
              handleLike(blog)
            }}
          >
            like
          </button>
          {usersOwn && (
            <button style={{ ...styles.roundedBtn, ...removeButtonStyle }} onClick={confirmRemove}>
              remove
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
