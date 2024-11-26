/** @format */

import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useModifyBlog } from '../customHooks/useModifyBlog'

import { Link } from 'react-router-dom'

import colors from '../constants/colors'
import styles from '../constants/styles'

const Blog = ({
  blog,
  isExpandable = true,
  expand = undefined,
  notifyChildChanged = undefined,
}) => {
  const loggedInUser = useSelector((state) => state.loggedInUser)
  const [isExpanded, setIsExpanded] = useState(expand === undefined ? false : expand)
  const { like, remove } = useModifyBlog()

  const usersOwn = blog.user ? loggedInUser.user.id === blog.user.id : false

  useEffect(() => {
    if (expand === undefined) {
      return
    }
    setIsExpanded(expand)
  }, [expand])

  const toggleExpand = (event) => {
    setIsExpanded(!isExpanded)
    if (notifyChildChanged) {
      notifyChildChanged()
    }
  }

  const confirmRemove = () => {
    if (window.confirm(`Delete "${blog.title}" for good?`)) {
      remove(blog)
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
        {isExpandable && (
          <button style={styles.roundedBtn} data-testid='toggleShowBtn' onClick={toggleExpand}>
            {isExpanded ? 'hide' : 'show'}
          </button>
        )}
      </div>

      {(!isExpandable || isExpanded) && (
        <div
          data-testid='url'
          style={{ ...blogFieldStyle, ...styles.indentedContent, ...smallTextStyle }}
        >
          <a href={blog.url} target='_blank'>
            {blog.url}
          </a>
        </div>
      )}
      {(!isExpandable || isExpanded) && (
        <div
          data-testid='likes'
          style={{ ...blogFieldStyle, ...styles.indentedContent, ...smallTextStyle }}
        >
          likes: {blog.likes}
        </div>
      )}
      {(!isExpandable || isExpanded) && (
        <div
          data-testid='user'
          style={{ ...blogFieldStyle, ...styles.indentedContent, ...smallTextStyle }}
        >
          {blog.user ? blog.user.name : 'user not defined'}
        </div>
      )}
      {(!isExpandable || isExpanded) && (
        <div style={{ ...blogFieldStyle, ...styles.indentedContent, ...buttonWrapperStyle }}>
          <button
            style={{ ...styles.roundedBtn, ...likeButtonStyle }}
            data-testid='likeBtn'
            onClick={() => {
              like(blog)
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
