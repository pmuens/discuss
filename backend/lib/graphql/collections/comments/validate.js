'use strict';

const Promise = require('bluebird');

let validate = {
  id: (id) => {},
  body: (body) => {
    if (!body.length) return Promise.reject('invalid body');
  },
  postId: (postId) => {},
  jwt: (jwt) => {}
};

module.exports = (data) => {
  Object.keys(data).forEach((d) => { validate[d](data[d]) });
  return Promise.resolve();
};
