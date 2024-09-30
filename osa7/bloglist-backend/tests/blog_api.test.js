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

const loginSuccesfully = async (userIndx = 0) => {
  loginUser = testUsers[userIndx]
  loginInfo = {
    username: loginUser.username,
    password: loginUser.password
  }
  const response = await api
    .post("/api/login")
    .send(loginInfo)
    .expect(200)
    .expect("Content-Type", /application\/json/)
  return { user: response.body.user, authHeader: { Authorization: "Bearer " + response.body.token } }
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

const randomInt = (minIncl, maxExcl) => {
  return Math.floor(Math.random() * (maxExcl - minIncl) + minIncl)
}

const randomString = (length) => {
  let result = ""
  let counter = 0

  while (counter < length) {
    result += String.fromCharCode(randomInt(32, 127))
    counter++
  }

  return result
}

const addNewBlog = async (auth, expectedResCode) => {
  const blogContent = {
    title: randomString( randomInt(10,40) ),
    author: randomString( randomInt(10,40) ),
    url: randomString( randomInt(20,120) ),
    likes: randomInt(0,1000),
  }

  const response = await api
    .post("/api/blogs")
    .set(auth)
    .send(blogContent)
    .expect(expectedResCode)
    .expect("Content-Type", /application\/json/)
  
  return { blogContent, addedBlog: response.body }
}

const pickOnlyContentFields = ({ author, title, url, likes, }) => ({ author, title, url, likes, })

const checkBlogIsIncludedInList = (blogToCheck, list) => {
  trimmedList = list.map(blog => pickOnlyContentFields(blog))
  expect(trimmedList).toContainEqual(pickOnlyContentFields(blogToCheck))
}

const checkBlogIsNotIncludedInList = (blogToCheck, list) => {
  trimmedList = list.map(blog => pickOnlyContentFields(blog))
  trimmedList.forEach( blog => {
    expect(Object.keys(blog).sort()).toEqual(Object.keys(blogToCheck).sort())
  })
  expect(trimmedList).not.toContainEqual(blogToCheck)
}

const checkBlogGotAddedToDb = async (blogToCheck) => {
  const blogsAtDb = await helper.blogsInDb()
  expect(blogsAtDb).toHaveLength(testBlogs.length + 1)
  checkBlogIsIncludedInList(blogToCheck, blogsAtDb)
}

const getBlogUnderUser = async (blogToGet, userToGet) => {
  const response = await api
    .get("/api/users")
    .expect(200)
    .expect("Content-Type", /application\/json/)

  const blogsUnderUser = response.body
    .find(user => user.id === userToGet.id)
    .blogs

  return blogsUnderUser.find(blog => blog.id === blogToGet.id)
}

const checkBlogGotAddedUnderUser = async (blogToCheck, userToCheck) => {
  const matchingBlog = await getBlogUnderUser(blogToCheck, userToCheck)
  expect(matchingBlog).toBeDefined()
}

const checkBlogWasntAddedToDb = async (blogToCheck) => {
  const blogsAtDb = await helper.blogsInDb()
  expect(blogsAtDb).toHaveLength(testBlogs.length)
  checkBlogIsNotIncludedInList(blogToCheck, blogsAtDb)
}

const checkBlogGotRemovedFromDb = async (blogToCheck) => {
  const blogsAtDb = await helper.blogsInDb()
  checkBlogIsNotIncludedInList(blogToCheck, blogsAtDb)
}

const checkBlogGotRemovedFromUser = async (blogToCheck, userToCheck) => {
  const matchingBlog = await getBlogUnderUser(blogToCheck, userToCheck)
  expect(matchingBlog).not.toBeDefined()
}

const checkBlogWasntRemovedFromDb = async (blogToCheck) => {
  const blogsAtDb = await helper.blogsInDb()
  checkBlogIsIncludedInList(blogToCheck, blogsAtDb)
}

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

    test("blog made by signed in user can be added", async () => {
      const { user, authHeader } = await loginSuccesfully()
      const { blogContent, addedBlog } = await addNewBlog(authHeader, 201)
      await checkBlogGotAddedToDb(blogContent)
      await checkBlogGotAddedUnderUser(addedBlog, user)
    })
    
    test("blog made by user not signed in cannot be added", async () => {
      const { blogContent } = await addNewBlog(await loginUnsuccesfully(), 401)
      await checkBlogWasntAddedToDb(blogContent)
    })

    test("if property 'likes' gets unpopulated, it is defaulted to zero", async () => {
      const { authHeader } = await loginSuccesfully()
      const blogContent = {
        title: "OFFSETTING ANCHOR LINKS WITH A FIXED HEADER",
        author: "Michael Lysiak",
        url: "https://pixelflips.com/blog/anchor-links-with-a-fixed-header",
      }

      await api
        .post("/api/blogs")
        .set(authHeader)
        .send(blogContent)
        .expect(201)
        .expect("Content-Type", /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      addedBlog = blogsAtEnd.find(blog => blog.url === blogContent.url)
      expect(addedBlog.likes).toBe(0)
    })

    test("if property 'title' or 'url' gets unpopulated, request gets '400 Bad Request' as an answer", async () => {
      const { authHeader } = await loginSuccesfully()
      const blogContentNoTitle = {
        author: "Geir Arne Hjelle",
        url: "https://realpython.com/python-type-checking/",
        likes: 5,
      }

      const blogContentNoUrl = {
        title: "Python Type Checking (Guide)",
        author: "Geir Arne Hjelle",
        likes: 5,
      }

      await api
        .post("/api/blogs")
        .set(authHeader)
        .send(blogContentNoTitle)
        .expect(400)

      await api
        .post("/api/blogs")
        .set(authHeader)
        .send(blogContentNoUrl)
        .expect(400)
    })

  })

})

describe("test /api/blogs/<id> endpoint", () => {

  describe("test DELETE-request", () => {

    test("user who added a blog can delete it", async () => {
      const { user, authHeader } = await loginSuccesfully()
      const { blogContent, addedBlog } = await addNewBlog(authHeader, 201)
      await checkBlogGotAddedToDb(blogContent)

      await api
        .delete(`/api/blogs/${addedBlog.id}`)
        .set(authHeader)
        .expect(204)

      await checkBlogGotRemovedFromDb(blogContent)
      await checkBlogGotRemovedFromUser(addedBlog, user)
    })

    test("user who did not add the blog cannot delete it", async () => {
      let { authHeader } = await loginSuccesfully()
      const { blogContent, addedBlog } = await addNewBlog(authHeader, 201)
      await checkBlogGotAddedToDb(blogContent)
      // Notice that authHeader gets reset here to a different one
      ;({ authHeader } = await loginSuccesfully(1))

      await api
        .delete(`/api/blogs/${addedBlog.id}`)
        .set(authHeader)
        .expect(401)

      await checkBlogWasntRemovedFromDb(blogContent)
    })

    test("invalid id returns '400 Bad Request'", async () => {
      const { authHeader } = await loginSuccesfully()
      const { blogContent, addedBlog } = await addNewBlog(authHeader, 201)
      await checkBlogGotAddedToDb(blogContent)
      
      invalidId = "6578ac92be4ad3b1ff"
      await api
        .delete(`/api/blogs/${invalidId}`)
        .set(authHeader)
        .expect(400)
    })

    test("non existing id returns '400 Bad Request'", async () => {
      const { authHeader } = await loginSuccesfully()
      const { blogContent } = await addNewBlog(authHeader, 201)
      await checkBlogGotAddedToDb(blogContent)

      nonExistingBlogId = helper.nonExistingBlogId()
      await api
        .delete(`/api/blogs/${nonExistingBlogId}`)
        .set(authHeader)
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
