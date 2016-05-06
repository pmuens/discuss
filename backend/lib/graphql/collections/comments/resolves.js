'use strict';

const db = require('../../../dynamodb');
const uuid = require('uuid');
const decode = require('../../../auth').decode;

const stage = process.env.SERVERLESS_STAGE;
const projectName = process.env.SERVERLESS_PROJECT;
const commentsTable = projectName + '-comments-' + stage;

module.exports = {
  create(comment) {
    comment.id = uuid.v1();

    comment.userId = decode(comment.jwt).id;

    delete comment.jwt;

    comment.createdAt = String(Date.now());
    comment.updatedAt = String(Date.now());

    let putItem = db('put', {
      TableName: commentsTable,
      Item: comment
    });

    return putItem.then(() => comment);
  },

  getAll() {
    return db('scan', {
      TableName: commentsTable,
      ProjectionExpression: 'id, body, userId, createdAt, updatedAt'
    }).then(result => result.Items);
  },

  getAllByPostId(postId) {
    return db('query', {
      TableName: commentsTable,
      IndexName: 'postIdIndex',
      KeyConditionExpression: 'postId = :postId',
      ProjectionExpression: 'id, body, postId, userId, createdAt, updatedAt',
      ExpressionAttributeValues: {
        ':postId': postId
      }
    }).then(result => {
      return result.Items;
    });
  },

  get(id) {
    return db('get', {
      TableName: commentsTable,
      Key: { id },
      ProjectionExpression: 'id, body, userId, createdAt, updatedAt'
    }).then(result => {
      const Item = result.Item;
      if (!Item) return Promise.reject('Comment not found');

      return Item;
    });
  },

  update(comment) {
    let userId = decode(comment.jwt).id;

    return db('update', {
      TableName: commentsTable,
      Key: { id: comment.id },
      UpdateExpression: 'SET body = :body, updatedAt = :updatedAt',
      ConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':body': comment.body,
        ':updatedAt': String(Date.now()),
        ':userId': userId
      },
      ReturnValues: 'ALL_NEW'
    }).then(result => {
      return result.Attributes;
    })
  },

  delete(comment) {
    let userId = decode(comment.jwt).id;

    return db('delete', {
      TableName: commentsTable,
      Key: { id: comment.id },
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
