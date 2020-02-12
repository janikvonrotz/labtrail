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

test.serial('Create station Infopoint', async t => {
  const CREATE_STATION = gql`
  mutation createStation(
    $name: String!
    $location: String!
    $color: Color!
  ) {
    createStation(
      name: $name
      location: $location
      color: $color
     ) {
      id
    }
  }
  `
  result = merge(result, await mutate({
    mutation: CREATE_STATION,
    variables: {
      name: 'Infopoint',
      location: 'Outer Galaxy',
      color: 'RED'
    }
  }))
  t.assert(ObjectId.isValid(result.data.createStation.id))
})

test.serial('Get station Infopoint by Id', async t => {
  const GET_STATION = gql`
  query station($id: String) {
    station(id: $id) {
      id
      name
    }
  }
  `
  result = merge(result, await query({
    query: GET_STATION,
    variables: { id: result.data.createStation.id }
  }))
  t.is(result.data.station.name, 'Infopoint')
})

test.serial('Mutate station Infopoint to InfopointX', async t => {
  const UPDATE_STATION = gql`
  mutation updateStation($id: String!, $name: String) {
    updateStation(id: $id, name: $name) {
      success
    }
  }
  `
  result = merge(result, await mutate({
    mutation: UPDATE_STATION,
    variables: { id: result.data.createStation.id, name: 'InfopointX' }
  }))
  t.assert(result.data.updateStation.success)
})

test.serial('Delete station Infopoint by Id', async t => {
  const DELETE_STATION = gql`
  mutation deleteStation( $id: String!) {
    deleteStation(id: $id) {
      success
    }
  }
  `
  result = merge(result, await mutate({
    mutation: DELETE_STATION,
    variables: { id: result.data.createStation.id }
  }))
  t.assert(result.data.deleteStation.success)
})
