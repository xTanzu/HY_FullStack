const listHelper = require("../utils/list_helper")

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]

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
    expectedBlog = {
      author: blogs[0].author,
      blogs: 1
    }

    expect(listHelper.mostBlogs(blogs.slice(0,1))).toEqual(expectedBlog)
  })

  test("list of many returns author with most blogs", () => {
    expectedBlog = {
      author: "Robert C. Martin",
      blogs: 3
    }

    expect(listHelper.mostBlogs(blogs)).toEqual(expectedBlog)
  })
})
