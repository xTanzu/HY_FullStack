/** @format */

import { useState } from 'react'

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
        type='text'
        value={comment}
        name='comment'
        onChange={({ target }) => setComment(target.value)}
      />
    </form>
  )
}

export default CommentForm
