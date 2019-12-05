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

test.serial('Create document EnteEnteLos', async t => {
  const CREATE_DOCUMENT = gql`
  mutation createDocument(
    $title: String!
    $link: String! 
    $category: String!
    $forward: Boolean!
  ) {
    createDocument(
      title: $title
      link: $link
      category: $category
      forward: $forward
    ) {
      id
    }
  }
  `
  result = merge(result, await mutate({
    mutation: CREATE_DOCUMENT,
    variables: {
      title: 'EnteEnteLos',
      link: 'https://enteentelos.ch',
      category: result.data.createCategory.id,
      forward: true
    }
  }))
  t.assert(ObjectId.isValid(result.data.createDocument.id))
})

test.serial('Create station Infopoint', async t => {
  // Ensure staton is assigned to Acme tenant
  context = { user: { id: 1, email: 'admin@labtrail.app', role: 'ADMIN', tenant: result.data.createTenant.id } }
  const CREATE_STATION = gql`
  mutation createStation(
    $name: String!
    $location: String!
    $color: Color!
    $documents: [String]
  ) {
    createStation(
      name: $name
      location: $location
      color: $color
      documents: $documents
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
      color: 'RED',
      documents: [result.data.createDocument.id]
    }
  }))
  t.assert(ObjectId.isValid(result.data.createStation.id))
})

test.serial('Assign category Support to tenant Acme', async t => {
  // This makes the category Support active for redirects
  const ASSIGN_CATEGORY = gql`
  mutation assignCategory($category: String!) {
    assignCategory(category: $category) {
      success
    }
  }
  `
  result = merge(result, await mutate({
    mutation: ASSIGN_CATEGORY,
    variables: { category: result.data.createCategory.id }
  }))
  t.assert(result.data.assignCategory.success)
})

test.serial('Query redirect link on station Infopoint', async t => {
  const GET_REDIRECT_LINK = gql`
  query redirectLink($id: String) {
    redirectLink(id: $id) {
      url
    }
  }
  `
  result = merge(result, await query({
    query: GET_REDIRECT_LINK,
    variables: { id: result.data.createStation.id }
  }))
  t.is(result.data.redirectLink.url, 'https://enteentelos.ch')
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

test.serial('Delete document EnteEnteLos by Id', async t => {
  const DELETE_DOCUMENT = gql`
  mutation deleteDocument( $id: String!) {
    deleteDocument(id: $id) {
      success
    }
  }
  `
  result = merge(result, await mutate({
    mutation: DELETE_DOCUMENT,
    variables: { id: result.data.createDocument.id }
  }))
  t.assert(result.data.deleteDocument.success)
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
