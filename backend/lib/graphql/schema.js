'use strict';

const GraphQL = require('graphql');
const GraphQLObjectType = GraphQL.GraphQLObjectType;
const GraphQLSchema = GraphQL.GraphQLSchema;
const queries = {};
const mutations = {};

const Queries = new GraphQLObjectType({
  name: 'Root',
  description: 'Root of the Schema',
  fields: queries
});

const Mutations = new GraphQLObjectType({
  name: 'Mutations',
  fields: mutations
});

module.exports = new GraphQLSchema({
  query: Queries,
  mutation: Mutations
});
