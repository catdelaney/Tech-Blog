const sequelize = require('../config/connection');
const { User, blogPosts, Comment } = require('../models');

const userData = require('./userData.json');
const blogData = require('./blogData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        returning: true,
      });

    for (const blog of blogData) {
      await blogPosts.create(blog);
    }

    for (const comment of commentData) {
      await Comment.create({
        ...comment,
        user_id: users[Math.floor(Math.random() * users.length)].id,
      });
    }

  process.exit(0)
  };

seedDatabase();
