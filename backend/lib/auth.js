'use strict';

const jwt = require('jsonwebtoken');

function authenticate(user) {
  return jwt.sign(user, process.env.AUTH_TOKEN_SECRET);
}

function decode(token) {
  return jwt.verify(token, process.env.AUTH_TOKEN_SECRET);
}

module.exports = { authenticate, decode };
