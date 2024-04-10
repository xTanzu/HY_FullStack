const { describe, test, expect, beforeEach } = require("@playwright/test")

const userCredentials = {
  username: "mattimeika",
  name: "Matti Meikäläinen",
  password: "salainensana1"
}

const resetBackendAndInsertTestData = async (request) => {
  await request.post("/api/testing/reset")
  await request.post("/api/users", {
    data: userCredentials
  })
}

const insertNewTestUserToBackend = async (request, credentials) => {
  await request.post("/api/users", {
    data: credentials
  })
}

const loginWith = async (page, credentials) => {
  // Vaihtoehto 1
  // await page.getByRole("textbox").first().fill(username)
  // await page.getByRole("textbox").last().fill(correctPassword)

  // Vaihtoehto 2
  // const textboxes = await page.getByRole("textbox").all()
  // await textboxes[0].fill(username)
  // await textboxes[1].fill(correctPassword)

  // Vaihtoehto 3
  await page.getByTestId("username_field").fill(credentials.username)
  await page.getByTestId("password_field").fill(credentials.password)

  await page.getByRole("button", { name: "login" }).click()
}

const logout = async (page) => {
  const logoutButton = await page.locator(".logoutBtn")
  await expect(logoutButton).toBeVisible()
  await logoutButton.click()
  const loginForm = await page.locator(".loginForm")
  await expect(loginForm).toBeVisible()
  await expect(loginForm).toContainText("Log into application")
}

const expandBlog = async (blog) => {
  const showButton = await blog.getByRole("button", { name: "show" })
  await showButton.click()
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole("button", { name: "New Blog" }).click()
  await page.getByTestId("newBlogTitle").fill(title)
  await page.getByTestId("newBlogAuthor").fill(author)
  await page.getByTestId("newBlogURL").fill(url)
  await page.getByRole("button", { name: "add" }).click()
  await page.locator(".blogItemWrapper").filter({ hasText: title }).waitFor()
}

const expectBlogToBeListed = async (page, content, user) => {
  const blogs = await page.locator(".blogItemWrapper")
  const addedBlog = blogs.filter({ hasText: content.title })
  await expect(addedBlog).toBeVisible()
  await expect(addedBlog).toContainText(content.title)
  await expect(addedBlog).toContainText(content.author)
  // To be not visible before expanding,
  await expect(addedBlog).not.toContainText(content.url)
  await expect(addedBlog).not.toContainText("likes:")
  await expect(addedBlog).not.toContainText(user.name)
  // but visible after
  await addedBlog.getByRole("button", { name: "show" }).click()
  await expect(addedBlog).toContainText(content.url)
  await expect(addedBlog).toContainText("likes: 0")
  await expect(addedBlog).toContainText(user.name)
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
    await loginWith(page, userCredentials)
    await expect(page.getByText(`${userCredentials.name} logged in`)).toBeVisible()
  })

  test("login with incorrect credentials does not succeed", async ({ page }) => {
    const wrongCredentials = {
      username: "hakkinenmika",
      name: "Mika Häkkinen",
      password: "vääräsalasana0",
    }
    await loginWith(page, wrongCredentials)
    await expect(page.getByText("username or password incorrect")).toBeVisible()
  })

  describe("when logged in", () => {

    const content = {
      title: "FP vs. OO",
      author: "Robert C. Martin",
      url: "https://blog.cleancoder.com/uncle-bob/2018/04/13/FPvsOO.html",
    }

    beforeEach(async ({ page }) => {
      await loginWith(page, userCredentials)
    })

    test("a blog can be created", async ({ page }) => {
      await createBlog(page, ...Object.values(content))
      await expectBlogToBeListed(page, content, userCredentials)
    })

    describe("when blog has been added", () => {

      beforeEach(async ({ page }) => {
        createBlog(page, ...Object.values(content))
      })

      test("blog can be liked", async ({ page }) => {
        const addedBlog = await page.locator(".blogItemWrapper").filter({ hasText: content.title })
        await expect(addedBlog).toBeVisible()
        await expandBlog(addedBlog)
        await expect(addedBlog).toContainText("likes: 0")
        const likeButton = await addedBlog.getByRole("button", { name: "like" })
        await likeButton.click()
        await expect(addedBlog).toContainText("likes: 1")
      })

      test("blog can be removed", async ({ page }) => {
        const addedBlog = await page.locator(".blogItemWrapper").filter({ hasText: content.title })
        await expect(addedBlog).toBeVisible()
        await expandBlog(addedBlog)
        await expect(addedBlog).toContainText("remove")
        const removeButton = await addedBlog.getByRole("button", { name: "remove" })
        // Dialog box handler to accept removal of blog
        page.on("dialog", async (dialog) => {
          console.log(`Dialog message: ${dialog.message()}`)
          if (dialog.type() === "confirm" && dialog.message() === `Delete \"${content.title}\" for good?`) {
            console.log("Pressing 'OK' on dialog box")
            await dialog.accept()
          } else {
            console.log("Not the wanted dialog box, dismissing")
            await dialog.accept()
          }
        })
        await removeButton.click()
        await expect(addedBlog).not.toBeVisible()
      })

      test("only user who created the blog can remove it", async ({ page, request }) => {
        const addedBlog = await page.locator(".blogItemWrapper").filter({ hasText: content.title })
        await expect(addedBlog).toBeVisible()
        await expandBlog(addedBlog)
        await expect(addedBlog).toContainText("remove")
        const removeButton = await addedBlog.getByRole("button", { name: "remove" })
        await expect(removeButton).toBeVisible()
        await logout(page)
        const newUserCredentials = {
          username: "tattiteika",
          name: "Tatti Teikäläinen",
          password: "salainensana2"
        }
        await insertNewTestUserToBackend(request, newUserCredentials)
        await loginWith(page, newUserCredentials)
        await expect(page.getByText(`${newUserCredentials.name} logged in`)).toBeVisible()
        const theSameBlog = await page.locator(".blogItemWrapper").filter({ hasText: content.title })
        await expect(theSameBlog).toBeVisible()
        await expandBlog(theSameBlog)
        await expect(theSameBlog).not.toContainText("remove")
      })

    })

  })

})
