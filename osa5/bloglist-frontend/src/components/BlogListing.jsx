import { useState, useEffect } from "react"

import blogService from "../services/blogs"
import Blog from "./Blog"

const BlogListing = ({ loggedUser }) => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  return (
    <div className="blogListing">
      <h2>blogs</h2>
      <br/>
      <div>{loggedUser ? `${loggedUser.user.name} logged in` : ""}</div>      
      <br/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default BlogListing
