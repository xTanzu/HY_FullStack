const dummy = blogs => 1

const totalLikes = blogs => {

  if (blogs.length === 0) {
    return 0
  }

  const addLikes = (accumulator, current) => accumulator + current.likes

  return blogs.reduce(addLikes, 0)
}

module.exports = {
  dummy,
  totalLikes
}
