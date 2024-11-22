/** @format */

import { useModifyBlog } from '../customHooks/useModifyBlog'

import CommentForm from './CommentForm'

import colors from '../constants/colors'
import styles from '../constants/styles'

const Comments = ({ blog }) => {
  const { comment } = useModifyBlog()

  return (
    <div style={styles.paneWrapper}>
      <h3>comments:</h3>
      <CommentForm blog={blog} submitComment={comment} />
      <ul>
        {blog.comments &&
          blog.comments.map((comment, indx) => (
            <li key={`${blog.id}.comment[${indx}]`}>{comment}</li>
          ))}
      </ul>
    </div>
  )
}

export default Comments
