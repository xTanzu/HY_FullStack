const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const Blog = require("../models/blog")
const helper = require("./test_helper")
const testBlogs = helper.testBlogs

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = testBlogs
    .map(blog => new Blog(blog))
  const blogPromises = blogObjects
    .map(blog => blog.save())
  await Promise.all(blogPromises)
})

describe("test GET-request on /api/blogs endpoint", () => {

  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/)
  })

  test("correct amount of blogs are returned", async () => {
    const response = await api.get("/api/blogs")
    expect(response.body).toHaveLength(testBlogs.length)
  })

  test("correct blogs are returned", async () => {
    const response = await api.get("/api/blogs")
    testBlogs.forEach(blog => {
      expect(response.body).toContainEqual(blog)
    })
  })

  test("blogs have field id", async () => {
    const response = await api.get("/api/blogs")
    response.body.forEach(blog => {
      expect(blog.id).toBeDefined()
    })
  })

})

describe("test POST-request on /api/blogs endpoint", () => {

  test("blog can be added", async () => {
    const newBlog = {
      title: "Always separate app and server files !",
      author: "nermineslimane",
      url: "https://dev.to/nermineslimane/always-separate-app-and-server-files--1nc7",
      likes: 5,
    }

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(testBlogs.length + 1)
    trimmedBlogs = blogsAtEnd.map(blog => {
      delete blog.id
      delete blog.__v
      return blog
    })
    expect(trimmedBlogs).toContainEqual(newBlog)
  })

  test("if property 'likes' gets unpopulated, it is defaulted to zero", async () => {
    const newBlog = {
      title: "OFFSETTING ANCHOR LINKS WITH A FIXED HEADER",
      author: "Michael Lysiak",
      url: "https://pixelflips.com/blog/anchor-links-with-a-fixed-header",
    }

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    addedBlog = blogsAtEnd.find(blog => blog.url === newBlog.url)
    expect(addedBlog.likes).toBe(0)
  })

  test("if property 'title' or 'url' gets unpopulated, request gets '400 Bad Request' as an answer", async () => {
    const newBlogNoTitle = {
      author: "Geir Arne Hjelle",
      url: "https://realpython.com/python-type-checking/",
      likes: 5,
    }

    const newBlogNoUrl = {
      title: "Python Type Checking (Guide)",
      author: "Geir Arne Hjelle",
      likes: 5,
    }

    await api
      .post("/api/blogs")
      .send(newBlogNoTitle)
      .expect(400)
    
    await api
      .post("/api/blogs")
      .send(newBlogNoUrl)
      .expect(400)
  })

})

afterAll(async () => {
  await mongoose.connection.close()
})
