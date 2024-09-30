import { useState } from "react"


const Blog = ({ blog, loggedInUser, handleLike, handleRemove }) => {

  const [isExpanded, setIsExpanded] = useState(false)

  const usersOwn = blog.user ? loggedInUser.user.id === blog.user.id : false

  const toggleExpand = event => {
    setIsExpanded(!isExpanded)
  }

  const confirmRemove = () => {
    if (window.confirm(`Delete "${blog.title}" for good?`)) {
      handleRemove(blog)
    }
  }

  const wrapperStyle = {
    marginBottom: 8,
    border: "2px solid black",
  }

  const paragraphStyle = {
    margin: 4,
  }

  const removeButtonStyle = {
    margin: 4,
    border: "1px solid red",
    color: "red",
  }

  return (
    <div className="blogItemWrapper" style={wrapperStyle}>
      <p data-testid="titleAndAuthor" style={paragraphStyle}>
        {blog.title}, {blog.author}
        <button data-testid="toggleShowBtn" onClick={toggleExpand}>{isExpanded ? "hide" : "show"}</button>
      </p>

      {isExpanded && <p data-testid="url" style={paragraphStyle}>{blog.url}</p>}
      {isExpanded && <p data-testid="likes" style={paragraphStyle}>likes: {blog.likes} <button data-testid="likeBtn" onClick={() => {handleLike(blog)}}>like</button> </p>}
      {isExpanded && <p data-testid="user" style={paragraphStyle}>{blog.user ? blog.user.name : "user not defined"}</p>}
      {isExpanded && usersOwn && <button style={removeButtonStyle} onClick={confirmRemove}>remove</button>}
    </div>
  )
}

export default Blog
