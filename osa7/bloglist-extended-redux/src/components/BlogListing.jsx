/** @format */

import { useState } from 'react'

import Blog from './Blog'

import colors from '../constants/colors'
import styles from '../constants/styles'

const BlogListing = ({ blogs, title }) => {
  const [expandAll, setExpandAll] = useState(false)

  const notifyChildChanged = () => {
    setExpandAll(undefined)
  }

  const headerWrapperStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-around',
  }

  const blogsTitleStyle = {
    flexGrow: 1,
    fontSize: 24,
    color: colors.mainWhite,
    textAlign: 'center',
    // background: 'red',
  }

  const buttonWrapper = {
    // width: '50%',
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'space-evenly',
    gap: 10,
    // background: 'red',
  }

  const expandBtnStyle = {
    flexGrow: 1,
  }

  return (
    <>
      <div style={headerWrapperStyle}>
        {title && <div style={{ ...styles.title, ...blogsTitleStyle }}>{title}</div>}
        <div style={buttonWrapper}>
          <button
            style={{ ...styles.roundedBtn, ...expandBtnStyle }}
            onClick={() => setExpandAll(true)}
          >
            show all
          </button>
          <button
            style={{ ...styles.roundedBtn, ...expandBtnStyle }}
            onClick={() => setExpandAll(false)}
          >
            hide all
          </button>
        </div>
      </div>
      {blogs
        .toSorted((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            expand={expandAll}
            notifyChildChanged={notifyChildChanged}
          />
        ))}
    </>
  )
}

export default BlogListing
