/** @format */

import { useState } from 'react'

import colors from '../constants/colors'
import styles from '../constants/styles'

const CommentForm = ({ blog, submitComment }) => {
  const [comment, setComment] = useState('')

  const handleComment = async (event) => {
    event.preventDefault()
    const success = await submitComment(blog, comment)
    if (success) {
      setComment('')
    }
  }

  return (
    <form onSubmit={handleComment}>
      <input
        style={styles.formInput}
        type='text'
        value={comment}
        name='comment'
        onChange={({ target }) => setComment(target.value)}
      />
    </form>
  )
}

export default CommentForm
