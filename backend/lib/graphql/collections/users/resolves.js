'use strict';

const Promise = require('bluebird');
const uuid = require('uuid');
const bcryptjs = require('bcryptjs');
const db = require('../../../dynamodb');
const authenticate = require('../../../auth').authenticate;

const stage = process.env.SERVERLESS_STAGE;
const projectName = process.env.SERVERLESS_PROJECT;
const usersTable = projectName + '-users-' + stage;

module.exports = {
  signUp(user) {
    user.id = uuid.v1();

    user.password = bcryptjs.hashSync(user.password, 10);

    user.createdAt = String(new Date().getTime());
    user.updatedAt = String(new Date().getTime());

    let putItem = db('put', {
      TableName: usersTable,
      Item: user
    });

    return putItem.then(() => user);
  },

  signIn(user) {
    const email = user.email;
    const password = user.password;

    return db('get', {
      TableName: usersTable,
      Key: { email },
      AttributesToGet: [
        'id',
        'username',
        'email',
        'password',
        'createdAt',
        'updatedAt'
      ]
    })
      .then(result => {
        const Item = result.Item;
        if (!Item) return Promise.reject('User not found');

        let match = bcryptjs.compareSync(password, Item.password);
        if (!match) return Promise.reject('invalid password');

        delete Item.password;

        Item.jwt = authenticate(Item);

        return Item;
      });
  },

  index() {
    return db('scan', {
      TableName: usersTable,
      AttributesToGet: [
        'id',
        'username',
        'email',
        'createdAt',
        'updatedAt'
      ]
    }).then(result => result.Items);
  }
};
