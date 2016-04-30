'use strict';

const jwt = require('jsonwebtoken');

function authenticate(user) {
  return jwt.sign(user, process.env.AUTH_TOKEN_SECRET);
}

module.exports = { authenticate };
