/** @format */

import Blog from './Blog'

const BlogListing = ({ blogs }) => {
  return (
    <>
      {blogs
        .toSorted((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
    </>
  )
}

export default BlogListing
