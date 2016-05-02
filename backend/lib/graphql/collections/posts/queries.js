'use strict';

const GraphQLNonNull = require('graphql').GraphQLNonNull;
const GraphQLList = require('graphql').GraphQLList;
const GraphQLString = require('graphql').GraphQLString;

const PostType = require('./type');
const validate = require('./validate');
const resolves = require('./resolves');

module.exports = {
  posts: {
    type: new GraphQLList(PostType),
    description: 'List of posts',
    resolve: function(source, args) {
      return resolves.getAll();
    }
  },
  post: {
    type: PostType,
    description: 'Post',
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve: function (source, args) {
      return validate(args).then(() => resolves.get(args.id));
    }
  }
};
