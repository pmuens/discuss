'use strict';

const GraphQLList = require('graphql').GraphQLList;
const GraphQLObjectType = require('graphql').GraphQLObjectType;
const GraphQLString = require('graphql').GraphQLString;

const UserType = require('../users/type');
const userResolves = require('../users/resolves');
const CommentType = require('../comments/type');
const commentResolves = require('../comments/resolves');

module.exports = new GraphQLObjectType({
  name: 'Post',
  description: 'Post',
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    author: {
      type: UserType,
      resolve: function(source, args) {
        return userResolves.get(source.userId);
      }
    },
    comments: {
      type: new GraphQLList(CommentType),
      resolve: function(source, args) {
        return commentResolves.getAllByPostId(source.id);
      }
    },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  })
});
