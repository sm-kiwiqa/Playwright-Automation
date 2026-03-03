require('dotenv').config();
const { use } = require('react');
const user_data = require('../test-data/users.jason');

const env = {
  baseURL: process.env.BASE_URL,
  validUser: {
    email: process.env.VALID_EMAIL,
    password: process.env.VALID_PASSWORD
  },
  invalidUser: {
    email: user_data.invalid_user.email,
    password: user_data.invalid_user.password
  }
};

module.exports = env;