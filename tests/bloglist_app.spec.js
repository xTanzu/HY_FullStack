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

})
