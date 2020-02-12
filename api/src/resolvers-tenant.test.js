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
var context = { user: { id: 1, email: 'admin@labtrail.app', role: 'ADMIN', tenant: 1 } }
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
  context: () => (context),
  schemaDirectives: directives
})
const { query, mutate } = createTestClient(server)

// Share context between tests
var result = {}

test.serial('Create tenant Acme', async t => {
  const CREATE_TENANT = gql`
  mutation createTenant( $name: String!) {
    createTenant(name: $name) {
      id
    }
  }
  `
  result = merge(result, await mutate({
    mutation: CREATE_TENANT,
    variables: { name: 'Acme' }
  }))
  t.assert(ObjectId.isValid(result.data.createTenant.id))
})

test.serial('Get tenant Acme by Id', async t => {
  const GET_TENANT = gql`
  query tenant($id: String) {
    tenant(id: $id) {
      id
      name
    }
  }
  `
  result = merge(result, await query({
    query: GET_TENANT,
    variables: { id: result.data.createTenant.id }
  }))
  t.is(result.data.tenant.name, 'Acme')
})

test.serial('Mutate tenant Acme to AcmeX', async t => {
  const UPDATE_TENANT = gql`
  mutation updateTenant($id: String!, $name: String) {
    updateTenant(id: $id, name: $name) {
      success
    }
  }
  `
  result = merge(result, await mutate({
    mutation: UPDATE_TENANT,
    variables: { id: result.data.createTenant.id, name: 'AcmeX' }
  }))
  t.assert(result.data.updateTenant.success)
})

test.serial('Delete tenant Acme by Id', async t => {
  const DELETE_TENANT = gql`
  mutation deleteTenant( $id: String!) {
    deleteTenant(id: $id) {
      success
    }
  }
  `
  result = merge(result, await mutate({
    mutation: DELETE_TENANT,
    variables: { id: result.data.createTenant.id }
  }))
  t.assert(result.data.deleteTenant.success)
})
