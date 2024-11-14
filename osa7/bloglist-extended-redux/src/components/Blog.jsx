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

  const wrapperStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    padding: 10,
    borderRadius: 10,
    background: colors.mainWhite,
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

  const titleStyle = {
    // marginBottom: 8,
    fontSize: 20,
    fontWeight: 'bold',
    textDecoration: 'none',
    color: colors.textGrey,
    // background: 'red',
  }

  const subTextStyle = {
    color: colors.textAccent,
    marginLeft: 12,
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
    <div className='blogItemWrapper' style={wrapperStyle}>
      <div data-testid='titleAndAuthor' style={blogFieldStyle}>
        <div style={titleAndAuthorWrapperStyle}>
          <Link to={`/blog/${blog.id}`} style={titleStyle}>
            {blog.title}
          </Link>
          <div style={{ ...subTextStyle, ...authorStyle }}>{blog.author}</div>
        </div>
        <button style={styles.roundedBtn} data-testid='toggleShowBtn' onClick={toggleExpand}>
          {isExpanded ? 'hide' : 'show'}
        </button>
      </div>

      {isExpanded && (
        <div data-testid='url' style={{ ...blogFieldStyle, ...subTextStyle, ...smallTextStyle }}>
          {blog.url}
        </div>
      )}
      {isExpanded && (
        <div data-testid='likes' style={{ ...blogFieldStyle, ...subTextStyle, ...smallTextStyle }}>
          likes: {blog.likes}
        </div>
      )}
      {isExpanded && (
        <div data-testid='user' style={{ ...blogFieldStyle, ...subTextStyle, ...smallTextStyle }}>
          {blog.user ? blog.user.name : 'user not defined'}
        </div>
      )}
      {isExpanded && (
        <div style={{ ...blogFieldStyle, ...subTextStyle, ...buttonWrapperStyle }}>
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
