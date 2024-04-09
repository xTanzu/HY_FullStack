const { describe, test, expect, beforeEach } = require("@playwright/test")

const correctUsername = "mattimeika"
const correctPassword = "salainensana1"


const resetBackendAndInsertTestData = async (request) => {
  await request.post("/api/testing/reset")
  await request.post("/api/users", {
    data: {
      username: "mattimeika",
      name: "Matti Meikäläinen",
      password: "salainensana1"
    }
  })
}

const loginWith = async (page, username, password) => {
  // Vaihtoehto 1
  // await page.getByRole("textbox").first().fill(correctUsername)
  // await page.getByRole("textbox").last().fill(correctPassword)

  // Vaihtoehto 2
  // const textboxes = await page.getByRole("textbox").all()
  // await textboxes[0].fill(correctUsername)
  // await textboxes[1].fill(correctPassword)

  // Vaihtoehto 3
  await page.getByTestId("username_field").fill(username)
  await page.getByTestId("password_field").fill(password)

  await page.getByRole("button", { name: "login" }).click()
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole("button", { name: "New Blog" }).click()
  await page.getByTestId("newBlogTitle").fill(title)
  await page.getByTestId("newBlogAuthor").fill(author)
  await page.getByTestId("newBlogURL").fill(url)
  await page.getByRole("button", { name: "add" }).click()
  await page.locator(".blogItemWrapper").filter({ hasText: title }).waitFor()
}

describe("Bloglist app", () => {

  beforeEach(async ({ page, request }) => {
    resetBackendAndInsertTestData(request)
    await page.goto("http://localhost:5173")
  })

  test("front page opens to login form", async ({ page }) => {
    // await page.waitForSelector(".loginForm")
    await expect(page.getByText("Log into application")).toBeVisible()
    await expect(page.getByTestId("username_field")).toBeVisible()
    await expect(page.getByTestId("password_field")).toBeVisible()
    await expect(page.getByRole("button", { name: "login" })).toBeVisible()
  })

  test("login with correct credentials succeeds", async ({ page }) => {
    loginWith(page, correctUsername, correctPassword)
    await expect(page.getByText("Matti Meikäläinen logged in")).toBeVisible()
  })

  test("login with incorrect credentials does not succeed", async ({ page }) => {
    const wrongUsername = "hakkinenmika"
    const wrongPassword = "vääräsalasana0"
    loginWith(page, wrongUsername, wrongPassword)
    await expect(page.getByText("username or password incorrect")).toBeVisible()
  })

  describe("when logged in", () => {

    beforeEach(async ({ page }) => {
      await loginWith(page, correctUsername, correctPassword)
    })

    test("a blog can be created", async ({ page }) => {
      const title = "FP vs. OO"
      const author = "Robert C. Martin"
      const url = "https://blog.cleancoder.com/uncle-bob/2018/04/13/FPvsOO.html"
      await createBlog(page, title, author, url)
      const blogs = await page.locator(".blogItemWrapper")
      expect(await blogs.all()).toHaveLength(1)
      const addedBlog = blogs.filter({ hasText: title })
      await expect(addedBlog).toBeVisible()
      await expect(addedBlog).toContainText(title)
      await expect(addedBlog).toContainText(author)
      await expect(addedBlog).not.toContainText(url)
      await expect(addedBlog).not.toContainText("likes:")
      await expect(addedBlog).not.toContainText("Matti Meikäläinen")
      await addedBlog.getByRole("button", { name: "show" }).click()
      await expect(addedBlog).toContainText(url)
      await expect(addedBlog).toContainText("likes: 0")
      await expect(addedBlog).toContainText("Matti Meikäläinen")
    })

  })

})
