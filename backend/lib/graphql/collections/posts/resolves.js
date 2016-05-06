'use strict';

const db = require('../../../dynamodb');
const uuid = require('uuid');
const decode = require('../../../auth').decode;

const stage = process.env.SERVERLESS_STAGE;
const projectName = process.env.SERVERLESS_PROJECT;
const postsTable = projectName + '-posts-' + stage;

module.exports = {
  create(post) {
    post.id = uuid.v1();

    post.userId = decode(post.jwt).id;

    delete post.jwt;
    
    post.createdAt = String(Date.now());
    post.updatedAt = String(Date.now());

    let putItem = db('put', {
      TableName: postsTable,
      Item: post
    });

    return putItem.then(() => post);
  },
  
  getAll() {
    return db('scan', {
      TableName: postsTable,
      ProjectionExpression: 'id, title, body, userId, createdAt, updatedAt'
    }).then(result => result.Items);
  },

  get(id) {
    return db('get', {
      TableName: postsTable,
      Key: { id },
      ProjectionExpression: 'id, title, body, userId, createdAt, updatedAt'
    }).then(result => {
      const Item = result.Item;
      if (!Item) return Promise.reject('Post not found');

      return Item;
    });
  },

  update(post) {
    let userId = decode(post.jwt).id;

    return db('update', {
      TableName: postsTable,
      Key: { id: post.id },
      UpdateExpression: 'SET title = :title, body = :body, updatedAt = :updatedAt',
      ConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':title': post.title,
        ':body': post.body,
        ':updatedAt': String(Date.now()),
        ':userId': userId
      },
      ReturnValues: 'ALL_NEW'
    }).then(result => {
      return result.Attributes;
    })
  },

  delete(post) {
    let userId = decode(post.jwt).id;

    return db('delete', {
      TableName: postsTable,
      Key: { id: post.id },
      ConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId
      },
      ReturnValues: 'ALL_OLD'
    }).then(result => {
      return result.Attributes;
    });
  }
};
