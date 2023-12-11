const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const Blog = require("../models/blog")
const testBlogs = require("../tests/testBlogs")

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = testBlogs
    .map(blog => new Blog(blog))
  const blogPromises = blogObjects
    .map(blog => blog.save())
  await Promise.all(blogPromises)
})

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

afterAll(async () => {
  await mongoose.connection.close()
})
