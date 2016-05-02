'use strict';

const GraphQLString = require('graphql').GraphQLString;
const GraphQLNonNull = require('graphql').GraphQLNonNull;

const PostType = require('./type');
const validate = require('./validate');
const resolves = require('./resolves');

module.exports = {
  createPost: {
    type: PostType,
    description: 'Create a post',
    args: {
      title: { type: new GraphQLNonNull(GraphQLString) },
      body: { type: new GraphQLNonNull(GraphQLString) },
      jwt: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve(source, args) {
      return validate(args).then(() => resolves.create(args));
    }
  },
  updatePost: {
    type: PostType,
    description: 'Updates a post by id',
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
      title: { type: new GraphQLNonNull(GraphQLString) },
      body: { type: new GraphQLNonNull(GraphQLString) },
      jwt: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve(source, args) {
      return validate(args).then(() => resolves.update(args));
    }
  },
  deletePost: {
    type: PostType,
    description: 'Deletes a post by id',
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
      jwt: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve(source, args) {
      return validate(args).then(() => resolves.delete(args));
    }
  }
};
