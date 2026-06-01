const { test, expect, beforeEach, describe } = require("@playwright/test");
const { loginWith, createBlog, likeBlog } = require("./helper");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3003/api/testing/reset");
    await request.post("http://localhost:3003/api/users", {
      data: {
        name: "Matti Luukkainen",
        username: "mluukkai",
        password: "salainen",
      },
    });

    await page.goto("/");
  });

  test("Login form is shown", async ({ page }) => {
    await expect(page.getByText("log in to application")).toBeVisible();
    await expect(page.getByLabel("Username")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
    await expect(page.getByRole("button", { name: "log in" })).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await loginWith(page, "mluukkai", "salainen");
      await expect(page.getByText("Matti Luukkainen")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await loginWith(page, "mluukkai", "wrong");

      const errorDiv = page.locator(".notification");
      await expect(errorDiv).toContainText("Wrong username or password");
      await expect(
        page.getByText("Matti Luukkainen logged in"),
      ).not.toBeVisible();
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "mluukkai", "salainen");
    });

    test("a new blog can be created", async ({ page }) => {
      await createBlog(page, {
        title: "Understanding JavaScript Closures",
        author: "Kyle Simpson",
        url: "https://blog.example.com/js-closures",
      });

      await expect(
        page.getByRole("link", {
          name: "Understanding JavaScript Closures",
        }),
      ).toBeVisible();
    });

    describe("and a blog exists", () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, {
          title: "Understanding JavaScript Closures",
          author: "Kyle Simpson",
          url: "https://blog.example.com/js-closures",
        });
      });

      test("blog can be liked", async ({ page }) => {
        await page
          .getByRole("link", {
            name: "Understanding JavaScript Closures",
          })
          .click();

        await expect(page.getByText(/Likes:\s*0/i)).toBeVisible();

        await page
          .getByRole("button", {
            name: /like/i,
          })
          .click();

        await expect(page.getByText(/Likes:\s*1/i)).toBeVisible();
      });

      test("creator can delete their blog", async ({ page }) => {
        await page
          .getByRole("link", {
            name: "Understanding JavaScript Closures",
          })
          .click();

        page.once("dialog", async (dialog) => {
          expect(dialog.message()).toContain("Delete blog?");
          await dialog.accept();
        });

        await page
          .getByRole("button", {
            name: /delete/i,
          })
          .click();

        await expect(
          page.getByRole("link", {
            name: "Understanding JavaScript Closures",
          }),
        ).toHaveCount(0);
      });

      test("only creator sees the delete button", async ({ page, request }) => {
        await page.getByRole("button", { name: "logout" }).click();
        await request.post("http://localhost:3003/api/users", {
          data: {
            name: "Second User",
            username: "seconduser",
            password: "password123",
          },
        });

        await loginWith(page, "seconduser", "password123");

        await page
          .getByRole("link", {
            name: "Understanding JavaScript Closures",
          })
          .click();

        await expect(
          page.getByRole("button", {
            name: /delete/i,
          }),
        ).toHaveCount(0);
      });
    });

    describe("and several blogs exist", () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, {
          title: "first",
          author: "Author1",
          url: "url-1",
        });
        await createBlog(page, {
          title: "second",
          author: "Author2",
          url: "url-2",
        });
        await createBlog(page, {
          title: "third",
          author: "Author3",
          url: "url-3",
        });
      });

      test("blogs are ordered by number of likes (descending)", async ({
        page,
      }) => {
        // Wait for all three blogs to be visible before starting
        await expect(page.getByRole("link", { name: "first" })).toBeVisible();
        await expect(page.getByRole("link", { name: "second" })).toBeVisible();
        await expect(page.getByRole("link", { name: "third" })).toBeVisible();

        // THIRD -> 2 likes
        await page.getByRole("link", { name: "third" }).click();
        await page.getByRole("button", { name: /like/i }).click();
        await expect(page.getByText("Likes: 1")).toBeVisible();
        await page.getByRole("button", { name: /like/i }).click();
        await expect(page.getByText("Likes: 2")).toBeVisible();
        await page.goBack();
        await expect(page.getByRole("link", { name: "third" })).toBeVisible();

        // FIRST -> 1 like
        await page.getByRole("link", { name: "first" }).click();
        await page.getByRole("button", { name: /like/i }).click();
        await expect(page.getByText("Likes: 1")).toBeVisible();
        await page.goBack();
        await expect(page.getByRole("link", { name: "first" })).toBeVisible();

        // SECOND -> 3 likes
        await page.getByRole("link", { name: "second" }).click();
        await page.getByRole("button", { name: /like/i }).click();
        await expect(page.getByText("Likes: 1")).toBeVisible();
        await page.getByRole("button", { name: /like/i }).click();
        await expect(page.getByText("Likes: 2")).toBeVisible();
        await page.getByRole("button", { name: /like/i }).click();
        await expect(page.getByText("Likes: 3")).toBeVisible();
        await page.goBack();
        await expect(page.getByRole("link", { name: "second" })).toBeVisible();

        const blogs = page.getByTestId("blog-item");
        await expect(blogs.nth(0)).toContainText("second");
        await expect(blogs.nth(1)).toContainText("third");
        await expect(blogs.nth(2)).toContainText("first");
      });
    });
  });
});
