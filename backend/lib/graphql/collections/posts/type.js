'use strict';

const GraphQLObjectType = require('graphql').GraphQLObjectType;
const GraphQLString = require('graphql').GraphQLString;

const UserType = require('../users/type');
const userResolves = require('../users/resolves');

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
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  })
});
