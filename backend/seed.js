require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const config = require('./utils/config')
const User = require('./models/user')
const Blog = require('./models/blog')

const seed = async () => {
  await mongoose.connect(config.MONGODB_URI)

  const existing = await User.findOne({ username: 'testuser' })

  if (existing) {
    console.log('Test user already exists, skipping seed.')
  } else {
    const passwordHash = await bcrypt.hash('testpass123', 10)
    const user = await new User({
      username: 'testuser',
      name: 'Test User',
      passwordHash,
    }).save()

    const blogs = await Blog.insertMany([
      {
        title: 'Why Wolves Matter',
        author: 'Test User',
        url: 'https://example.com/wolves',
        likes: 4,
        user: user._id,
        comments: ['Fascinating ecosystem effects.'],
      },
      {
        title: 'Getting Started with Docker',
        author: 'Test User',
        url: 'https://example.com/docker',
        likes: 2,
        user: user._id,
        comments: [],
      },
    ])

    user.blogs = blogs.map((b) => b._id)
    await user.save()

    console.log('Seeded test user: testuser / testpass123')
    console.log(`Seeded ${blogs.length} blogs.`)
  }

  await mongoose.connection.close()
}

seed()