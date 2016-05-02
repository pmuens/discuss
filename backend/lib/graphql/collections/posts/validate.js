'use strict';

const Promise = require('bluebird');

let validate = {
  id: (id) => {},
  title: (title) => {
    if (!title.length) return Promise.reject('invalid title');
  },
  body: (body) => {
    if (!body.length) return Promise.reject('invalid body');
  },
  jwt: (jwt) => {}
};

module.exports = (data) => {
  Object.keys(data).forEach((d) => { validate[d](data[d]) });
  return Promise.resolve();
};
