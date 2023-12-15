const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const User = require("../models/user")
const helper = require("./test_helper")
const testUsers = helper.testUsers

const bcrypt = require("bcrypt")
const saltRounds = 10


const resetUsersInDb = async () => {
  await User.deleteMany({})
  userObjects = []
  for await (const testUser of testUsers) {
    const user = {...testUser}
    user.passwordHash = await bcrypt.hash(user.password, saltRounds)
    delete user.password
    userObjects.push(new User(user))
  }
  const userPromises = userObjects
    .map(user => user.save())
  await Promise.all(userPromises)
}


beforeEach(resetUsersInDb)


describe("test /api/users endpoint", () => {

  describe("test GET-request", () => {

    test("users are returned as json", async () => {
      await api
        .get("/api/users")
        .expect(200)
        .expect("Content-Type", /application\/json/)
    })

    test("correct amount of users are returned", async () => {
      const response = await api.get("/api/users")
      expect(response.body).toHaveLength(testUsers.length)
    })

    test("correct users are returned", async () => {
      const response = await api.get("/api/users")
      const pickOnlyNames = ({ username, name }) => ({ username, name })
      const responseNames = response.body.map(user => pickOnlyNames(user))
      testUsers.forEach(user => {
        expect(responseNames).toContainEqual(pickOnlyNames(user))
      })
    })

    test("users have id's", async () => {
      const response = await api.get("/api/users")
      response.body.forEach(user => {
        expect(user.id).toBeDefined()
      })
    })

  })

  describe("test POST-request", () => {

    test("user can be added", async () => {
      const newUser = {
        username: "maikkeli",
        name: "Michael Jackson",
        password: "seeuatneverland"
      }

      await api
        .post("/api/users")
        .send(newUser)
        .expect(201)
        .expect("Content-Type", /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(testUsers.length + 1)
      const pickOnlyNames = ({ username, name }) => ({ username, name })
      const namesAtEnd = usersAtEnd.map(user => pickOnlyNames(user))
      expect(namesAtEnd).toContainEqual(pickOnlyNames(newUser))
    })

  })

})
