/** @format */

import { useModifyBlog } from '../customHooks/useModifyBlog'

import CommentForm from './CommentForm'

import colors from '../constants/colors'
import styles from '../constants/styles'

const Comments = ({ blog }) => {
  const { comment } = useModifyBlog()

  const commentWrapper = {
    padding: 20,
  }

  const titleStyle = {
    margin: 0,
  }

  const commentStyle = {
    padding: 6,
    background: colors.lightestGrey,
    color: colors.textGrey,
    borderRadius: 10,
  }

  return (
    <div style={{ ...styles.paneWrapper, ...commentWrapper }}>
      <h3 style={{ ...styles.title, ...titleStyle }}>comments:</h3>
      <CommentForm blog={blog} submitComment={comment} />
      <div style={styles.paneWrapper}>
        {blog.comments &&
          blog.comments.map((comment, indx) => (
            <div style={commentStyle} key={`${blog.id}.comment[${indx}]`}>
              {comment}
            </div>
          ))}
      </div>
    </div>
  )
}

export default Comments
