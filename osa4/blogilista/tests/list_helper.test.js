const listHelper = require("../utils/list_helper")
const testBlogs = require("../tests/testBlogs")

const blogs = testBlogs

describe("dummy tests", () => {
  test("dummy returns one", () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })
})

describe("total likes", () => {
  test("empty list return zero", () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test("list of one returns value of itself", () => {
    expect(listHelper.totalLikes(blogs.slice(0,1))).toBe(blogs[0].likes)
  })

  test("list of many returns sum of its items", () => {
    expect(listHelper.totalLikes(blogs)).toBe(36)
  })

})

describe("favourite blog", () => {
  test("empty list returns null", () => {
    expect(listHelper.favoriteBlog([])).toBe(null)
  })

  test("list of one returns the only blog", () => {
    expectedBlog = {
      title: blogs[0].title,
      author: blogs[0].author,
      likes: blogs[0].likes
    }

    expect(listHelper.favoriteBlog(blogs.slice(0,1))).toEqual(expectedBlog)
  })

  test("list of many returns the one with most likes", () => {
    expectedBlog = {
      title: blogs[2].title,
      author: blogs[2].author,
      likes: blogs[2].likes
    }

    expect(listHelper.favoriteBlog(blogs)).toEqual(expectedBlog)
  })
})

describe("author with most blogs", () => {
  test("empty list returns null", () => {
    expect(listHelper.mostBlogs([])).toBe(null)
  })

  test("list of one returns the only author", () => {
    expectedAuthor = {
      author: blogs[0].author,
      blogs: 1
    }

    expect(listHelper.mostBlogs(blogs.slice(0,1))).toEqual(expectedAuthor)
  })

  test("list of many returns author with most blogs", () => {
    expectedAuthor = {
      author: "Robert C. Martin",
      blogs: 3
    }

    expect(listHelper.mostBlogs(blogs)).toEqual(expectedAuthor)
  })
})

describe("author with most likes", () => {
  test("empty list returns null", () => {
    expect(listHelper.mostLikes([])).toBe(null)
  })

  test("list of one returns the only author", () => {
    expectedAuthor = {
      author: blogs[0].author,
      likes: blogs[0].likes
    }

    expect(listHelper.mostLikes(blogs.slice(0,1))).toEqual(expectedAuthor)
  })

  test("list of many return author with most likes", () => {
    expectedAuthor = {
      author: blogs[1].author,
      likes: 17
    }

    expect(listHelper.mostLikes(blogs)).toEqual(expectedAuthor)
  })
})
