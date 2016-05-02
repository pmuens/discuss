'use strict';

const GraphQLString = require('graphql').GraphQLString;
const GraphQLNonNull = require('graphql').GraphQLNonNull;

const CommentType = require('./type');
const validate = require('./validate');
const resolves = require('./resolves');

module.exports = {
  createComment: {
    type: CommentType,
    description: 'Create a comment',
    args: {
      body: { type: new GraphQLNonNull(GraphQLString) },
      postId: { type: new GraphQLNonNull(GraphQLString) },
      jwt: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve(source, args) {
      return validate(args).then(() => resolves.create(args));
    }
  },
  updateComment: {
    type: CommentType,
    description: 'Updates a comment by id',
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
      body: { type: new GraphQLNonNull(GraphQLString) },
      jwt: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve(source, args) {
      return validate(args).then(() => resolves.update(args));
    }
  },
  deleteComment: {
    type: CommentType,
    description: 'Deletes a comment by id',
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
      jwt: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve(source, args) {
      return validate(args).then(() => resolves.delete(args));
    }
  }
};
