const { createTestClient } = require('apollo-server-testing')
const { ApolloServer, gql } = require('apollo-server-micro')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const directives = require('./directives')
const { merge } = require('lodash')
const userResolvers = require('./resolvers-user')
const stationResolvers = require('./resolvers-station')
const categoryResolvers = require('./resolvers-category')
const documentResolvers = require('./resolvers-document')
const tenantResolvers = require('./resolvers-tenant')
const searchResolvers = require('./resolvers-search')
const test = require('ava')
const { ObjectId } = require('mongodb')

// Load environment configuration
require('dotenv').config({ path: `${__dirname}/.env.${process.env.NODE_ENV}` })

// Initialize Apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers: merge(
    resolvers,
    userResolvers,
    stationResolvers,
    categoryResolvers,
    documentResolvers,
    tenantResolvers,
    searchResolvers
  ),
  context: () => ({ user: { id: 1, email: 'admin@labtrail.app', role: 'ADMIN', tenant: 1 } }),
  schemaDirectives: directives
})
const { query, mutate } = createTestClient(server)

// Share context between tests
var result = {}

test.serial('Create category Support', async t => {
  const CREATE_CATEGORY = gql`
  mutation createCategory( $name: String!) {
    createCategory(name: $name) {
      id
    }
  }
  `
  result = merge(result, await mutate({
    mutation: CREATE_CATEGORY,
    variables: { name: 'Support' }
  }))
  t.assert(ObjectId.isValid(result.data.createCategory.id))
})

test.serial('Get category Support by Id', async t => {
  const GET_CATEGORY = gql`
  query category($id: String) {
    category(id: $id) {
      id
      name
    }
  }
  `
  result = merge(result, await query({
    query: GET_CATEGORY,
    variables: { id: result.data.createCategory.id }
  }))
  t.is(result.data.category.name, 'Support')
})

test.serial('Mutate category Support to SupportX', async t => {
  const UPDATE_CATEGORY = gql`
  mutation updateCategory($id: String!, $name: String) {
    updateCategory(id: $id, name: $name) {
      success
    }
  }
  `
  result = merge(result, await mutate({
    mutation: UPDATE_CATEGORY,
    variables: { id: result.data.createCategory.id, name: 'SupportX' }
  }))
  t.assert(result.data.updateCategory.success)
})

test.serial('Delete category Support by Id', async t => {
  const DELETE_CATEGORY = gql`
  mutation deleteCategory( $id: String!) {
    deleteCategory(id: $id) {
      success
    }
  }
  `
  result = merge(result, await mutate({
    mutation: DELETE_CATEGORY,
    variables: { id: result.data.createCategory.id }
  }))
  t.assert(result.data.deleteCategory.success)
})
