'use strict';

const GraphQLList = require('graphql').GraphQLList;

const UserType = require('./type');
const resolves = require('./resolves');

module.exports = {
  users: {
    type: new GraphQLList(UserType),
    description: 'List of users',
    resolve: function(source, args) {
      return resolves.index();
    }
  }
};
