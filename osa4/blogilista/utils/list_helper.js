const dummy = blogs => 1

const totalLikes = blogs => {
  if (blogs.length === 0) {
    return 0
  }

  const addLikes = (accumulator, current) => accumulator + current.likes
  return blogs.reduce(addLikes, 0)
}

const favoriteBlog = blogs => {
  if (blogs.length === 0) {
    return null
  }

  const reduceToFavourite = (highestIndx, current, indx, blogArray) => {
    if (current.likes > blogArray[highestIndx].likes) {
      return indx
    }
    return highestIndx
  }

  favBlogIndx = blogs.reduce(reduceToFavourite, 0)
  favBlog = blogs[favBlogIndx]
  return { 
    title: favBlog.title,
    author: favBlog.author, 
    likes: favBlog.likes 
  }
}

const mostBlogs = blogs => {

  const formAuthorBlogStats = blog => {
    if (blog.author in authors) {
      authors[blog.author]++
    } else {
      authors[blog.author] = 1
    }
  }

  const authorWithMostBlogs = authors => {
    return Object.entries(authors).sort((a,b) => b[1] - a[1])[0][0]
  }

  if (blogs.length === 0) {
    return null
  }

  let authors = {}
  blogs.forEach(formAuthorBlogStats)
  maxAuthor = authorWithMostBlogs(authors)

  return {
    author: maxAuthor,
    blogs: authors[maxAuthor]
  }

}

const mostLikes = blogs => {

  const formAuthorLikeStats = blog => {
    if (blog.author in authors) {
      authors[blog.author] += blog.likes
    } else {
      authors[blog.author] = blog.likes
    }
  }

  const authorWithMostLikes = authors => {
    return Object.entries(authors).sort((a,b) => b[1] - a[1])[0][0]
  }

  if (blogs.length === 0) {
    return null
  }

  let authors = {}
  blogs.forEach(formAuthorLikeStats)
  maxAuthor = authorWithMostLikes(authors)

  return {
    author: maxAuthor,
    likes: authors[maxAuthor]
  }

}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
