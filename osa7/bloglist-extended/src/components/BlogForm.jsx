import { useState } from "react"

const BlogForm = ({ addNewBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState("")
  const [newBlogAuthor, setNewBlogAuthor] = useState("")
  const [newBlogURL, setNewBlogURL] = useState("")

  const clearBlogForm = () => {
    setNewBlogTitle("")
    setNewBlogAuthor("")
    setNewBlogURL("")
  }

  const newBlogHandler = async event => {
    event.preventDefault()
    const blog = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogURL
    }
    const response = await addNewBlog(blog)
    if (response.success === true) {
      clearBlogForm()
    }
  }

  return (
    <div className="blogForm">
      <h2>create new</h2>
      <form onSubmit={ newBlogHandler }>
        <div>
          <label htmlFor="title_field">title</label>
          <input id="title_field" type="text" value={newBlogTitle} name="newBlogTitle" data-testid="newBlogTitle" onChange={({ target }) => setNewBlogTitle(target.value)} />
        </div>
        <div>
          <label htmlFor="author_field">author</label>
          <input id="author_field" type="text" value={newBlogAuthor} name="newBlogAuthor" data-testid="newBlogAuthor" onChange={({ target }) => setNewBlogAuthor(target.value)} />
        </div>
        <div>
          <label htmlFor="URL_field">URL</label>
          <input id="URL_field" type="text" value={newBlogURL} name="newBlogURL" data-testid="newBlogURL" onChange={({ target }) => setNewBlogURL(target.value)} />
        </div>
        <button type="submit" data-testid="submitNewBlog" >add</button>
      </form>
    </div>
  )
}

export default BlogForm
