require('dotenv').config();
const users = require('../test-data/users.json');

const env = {
  baseURL: process.env.BASE_URL,
  validUser: {
    email: process.env.VALID_EMAIL,
    password: process.env.VALID_PASSWORD
  },
  invalidUser: {
    email: users.invalidUser.email,
    password: users.invalidUser.password
  }
};

module.exports = env;