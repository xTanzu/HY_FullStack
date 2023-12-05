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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
