'use strict';

const GraphQLNonNull = require('graphql').GraphQLNonNull;
const GraphQLList = require('graphql').GraphQLList;
const GraphQLString = require('graphql').GraphQLString;

const CommentType = require('./type');
const validate = require('./validate');
const resolves = require('./resolves');

module.exports = {
  comments: {
    type: new GraphQLList(CommentType),
    description: 'List of comments',
    resolve: function(source, args) {
      return resolves.getAll();
    }
  },
  comment: {
    type: CommentType,
    description: 'Comment',
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve: function (source, args) {
      return validate(args).then(() => resolves.get(args.id));
    }
  }
};
