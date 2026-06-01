const loginWith = async (page, username, password) => {
  await page.getByLabel('Username').fill(username)
  await page.getByLabel('Password').fill(password)
  await page.getByRole('button', { name: 'log in' }).click()
}

const createBlog = async (page, { title, author, url }) => {
  await page.getByRole('button', { name: 'new blog' }).click()
  await page.getByRole('textbox', { name: 'title' }).fill(title)
  await page.getByRole('textbox', { name: 'author' }).fill(author)
  await page.getByRole('textbox', { name: 'url' }).fill(url)
  await page.getByRole('button', { name: 'create' }).click()
}

const likeBlog = async (page, blogLikeBtn, numOfLikes) => {
  for (let i = 0; i < numOfLikes; i++) {
    await blogLikeBtn.click()
    await page.waitForTimeout(200)
  }
}

export { loginWith, createBlog, likeBlog }