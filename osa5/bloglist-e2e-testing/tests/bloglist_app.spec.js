const { describe, test, expect, beforeEach } = require("@playwright/test")

describe("Bloglist app", () => {

  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3003/api/testing/reset")
    await request.post("http://localhost:3003/api/users", {
      data: {
        username: "mattimeika",
        name: "Matti Meikäläinen",
        password: "salainensana1"
      }
    })
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
    const correctUsername = "mattimeika"
    const correctPassword = "salainensana1"

    // Vaihtoehto 1
    // await page.getByRole("textbox").first().fill(correctUsername)
    // await page.getByRole("textbox").last().fill(correctPassword)

    // Vaihtoehto 2
    // const textboxes = await page.getByRole("textbox").all()
    // await textboxes[0].fill(correctUsername)
    // await textboxes[1].fill(correctPassword)

    // Vaihtoehto 3
    await page.getByTestId("username_field").fill(correctUsername)
    await page.getByTestId("password_field").fill(correctPassword)

    await page.getByRole("button", { name: "login" }).click()
    await expect(page.getByText("Matti Meikäläinen logged in")).toBeVisible()
  })

  test("login with incorrect credentials does not succeed", async ({ page }) => {
    const wrongUsername = "hakkinenmika"
    const wrongPassword = "vääräsalasana0"

    await page.getByTestId("username_field").fill(wrongUsername)
    await page.getByTestId("password_field").fill(wrongPassword)

    await page.getByRole("button", { name: "login" }).click()
    await expect(page.getByText("username or password incorrect")).toBeVisible()
  })

})
