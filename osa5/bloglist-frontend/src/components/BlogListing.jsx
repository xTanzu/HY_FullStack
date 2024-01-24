import { useState, useEffect } from "react"

import blogService from "../services/blogs"
import Blog from "./Blog"

const BlogListing = ({ loggedInUser, setLoggedInUser }) => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const logoutHandler = () => {
    setLoggedInUser(null)
    window.localStorage.removeItem("loggedInUser")
  }

  return (
    <div className="blogListing">
      <h2>blogs</h2>
      <br/>
      <div>
        {loggedInUser ? `${loggedInUser.user.name} logged in` : ""}
        <button onClick={logoutHandler}>logout</button>
      </div>
      <br/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default BlogListing
