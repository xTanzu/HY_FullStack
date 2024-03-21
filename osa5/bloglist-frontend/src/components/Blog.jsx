import { useState } from "react"


const Blog = ({ blog }) => {

  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = event => {
    setIsExpanded(!isExpanded)
  }

  const wrapperStyle = {
    marginBottom: 8,
    border: "2px solid black",
  }

  const paragraphStyle = {
    margin: 4,
  }
  console.log(blog)

  return (
    <div className="blogItemWrapper" style={wrapperStyle}>
      <p style={paragraphStyle}>
        {blog.title} {blog.author}
        <button onClick={toggleExpand}>{isExpanded ? "hide" : "show"}</button>
      </p>
      {isExpanded && <p style={paragraphStyle}>{blog.url}</p>}
      {isExpanded && <p style={paragraphStyle}>likes: {blog.likes} <button>like</button></p>}
      {isExpanded && <p style={paragraphStyle}>{blog.user.name}</p>}
    </div>  
  )
}

export default Blog
