const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const Blog = require("../models/blog")
const helper = require("./test_helper")
const testBlogs = helper.testBlogs
const testUsers = helper.testUsers

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = testBlogs
    .map(blog => new Blog(blog))
  const blogPromises = blogObjects
    .map(blog => blog.save())
  await Promise.all(blogPromises)
})

describe("test /api/blogs endpoint", () => {

  describe("test GET-request", () => {

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
      const pickOnlyImportantFields = ({ id, author, title, url, likes, }) => ({ id, author, title, url, likes, })
      strippedResponse = response.body.map(blog => pickOnlyImportantFields(blog))
      testBlogs.forEach(blog => {
        expect(strippedResponse).toContainEqual(pickOnlyImportantFields(blog))
      })
    })

    test("blogs have field id", async () => {
      const response = await api.get("/api/blogs")
      response.body.forEach(blog => {
        expect(blog.id).toBeDefined()
      })
    })

  })

  describe("test POST-request", () => {

    const loginSuccesfully = async () => {
      loginUser = testUsers[1]
      loginInfo = {
        username: loginUser.username,
        password: loginUser.password
      }
      const response = await api
        .post("/api/login")
        .send(loginInfo)
        .expect(200)
        .expect("Content-Type", /application\/json/)
      return { Authorization: "Bearer " + response.body.token }
    }

    const loginUnsuccesfully = async () => {
      loginInfo = {
        username: "madeupname",
        password: "notvalidusername"
      }
      const response = await api
        .post("/api/login")
        .send(loginInfo)
        .expect(401)
        .expect("Content-Type", /application\/json/)
      return { Authorization: "Bearer thisIsNotAValidJSONWebToken6IkpXVCJ9.eyJ1c2VybmFtZSI6IkthYXJpamEiLCJpZCI6IjY1ODBhOWEyNTM5NTZjNGVkNWJlNzczZiIsImlhdCI6MTcwMjk0OTYyMX0.dHLjHLIYSnZ2-sNppuzTohTuzPNwCAC8L9kILa5kzBM" }
    }
    test("blog made by signed in user can be added", async () => {
      auth = await loginSuccesfully()
      const newBlog = {
        title: "Always separate app and server files !",
        author: "nermineslimane",
        url: "https://dev.to/nermineslimane/always-separate-app-and-server-files--1nc7",
        likes: 5,
      }

      await api
        .post("/api/blogs")
        .set(auth)
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(testBlogs.length + 1)
      const pickOnlyImportantFields = ({ author, title, url, likes, }) => ({ author, title, url, likes, })
      trimmedBlogs = blogsAtEnd.map(blog => pickOnlyImportantFields(blog))
      expect(trimmedBlogs).toContainEqual(newBlog)
    })
    
    test("blog made by user not signed in cannot be added", async () => {
      auth = await loginUnsuccesfully()
      const newBlog = {
        title: "Always separate app and server files !",
        author: "nermineslimane",
        url: "https://dev.to/nermineslimane/always-separate-app-and-server-files--1nc7",
        likes: 5
      }

      await api
        .post("/api/blogs")
        .set(auth)
        .send(newBlog)
        .expect(401)
        .expect("Content-Type", /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(testBlogs.length)
      const pickOnlyImportantFields = ({ author, title, url, likes, }) => ({ author, title, url, likes, })
      trimmedBlogs = blogsAtEnd.map(blog => pickOnlyImportantFields(blog))
      trimmedBlogs.forEach( blog => {
        expect(Object.keys(blog).sort()).toEqual(Object.keys(newBlog).sort())
      })
      expect(trimmedBlogs).not.toContainEqual(newBlog)
    })

    test("if property 'likes' gets unpopulated, it is defaulted to zero", async () => {
      auth = await loginSuccesfully()
      const newBlog = {
        title: "OFFSETTING ANCHOR LINKS WITH A FIXED HEADER",
        author: "Michael Lysiak",
        url: "https://pixelflips.com/blog/anchor-links-with-a-fixed-header",
      }

      await api
        .post("/api/blogs")
        .set(auth)
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      addedBlog = blogsAtEnd.find(blog => blog.url === newBlog.url)
      expect(addedBlog.likes).toBe(0)
    })

    test("if property 'title' or 'url' gets unpopulated, request gets '400 Bad Request' as an answer", async () => {
      auth = await loginSuccesfully()
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
        .set(auth)
        .send(newBlogNoTitle)
        .expect(400)

      await api
        .post("/api/blogs")
        .set(auth)
        .send(newBlogNoUrl)
        .expect(400)
    })

  })

})

describe("test /api/blogs/<id> endpoint", () => {

  describe("test DELETE-request", () => {

    test("added blog can be deleted", async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
      expect(blogsAtEnd).not.toContain(blogToDelete)
    })

    test("invalid id returns '400 Bad Request'", async () => {
      invalidId = "6578ac92be4ad3b1ff"
      await api
        .delete(`/api/blogs/${invalidId}`)
        .expect(400)
    })

    test("non existing id returns '400 Bad Request'", async () => {
      nonExistingBlogId = helper.nonExistingBlogId()
      await api
        .delete(`/api/blogs/${nonExistingBlogId}`)
        .expect(400)
    })

  })

  describe("test PUT-request", () => {

    test("added blog can be updated", async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      const updatedBlogContent = {
        title: "New Title",
        author: "New Author",
        url: "https://newurl.com/",
        likes: 69
      }

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlogContent)
        .expect(200)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
      expect(blogsAtEnd).not.toContainEqual(blogToUpdate)
      const strippedBlogs = blogsAtEnd.map(blog => {
        delete blog.id
        delete blog.__v
        return blog
      })
      expect(strippedBlogs).toContainEqual(updatedBlogContent)
    })

    test("invalid id returns '400 Bad Request'", async () => {
      invalidId = "6578ac92be4ad3b1ff"

      const updatedBlogContent = {
        title: "New Title",
        author: "New Author",
        url: "https://newurl.com/",
        likes: 69
      }

      await api
        .put(`/api/blogs/${invalidId}`)
        .send(updatedBlogContent)
        .expect(400)
    })

    test("non existing id returns '400 Bad Request'", async () => {
      nonExistingBlogId = helper.nonExistingBlogId()

      const updatedBlogContent = {
        title: "New Title",
        author: "New Author",
        url: "https://newurl.com/",
        likes: 69
      }

      await api
        .put(`/api/blogs/${invalidId}`)
        .send(updatedBlogContent)
        .expect(400)
    })

  })

})


afterAll(async () => {
  // This causes an error when running multiple test suites together
  // apparently mongoose needs the connection still in other suites
  // await mongoose.connection.close()
})
