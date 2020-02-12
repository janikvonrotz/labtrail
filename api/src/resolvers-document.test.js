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

test.serial('Get document EnteEnteLos by Id', async t => {
  const GET_DOCUMENT = gql`
  query document($id: String) {
    document(id: $id) {
      id
      title
    }
  }
  `
  result = merge(result, await query({
    query: GET_DOCUMENT,
    variables: { id: result.data.createDocument.id }
  }))
  t.is(result.data.document.title, 'EnteEnteLos')
})

test.serial('Mutate document EnteEnteLos to EnteEnteLosX', async t => {
  const UPDATE_DOCUMENT = gql`
  mutation updateDocument(
    $id: String!
    $title: String
  ) {
    updateDocument(
      id: $id
      title: $title
    ) {
      success
    }
  }
  `
  result = merge(result, await mutate({
    mutation: UPDATE_DOCUMENT,
    variables: { id: result.data.createDocument.id, title: 'EnteEnteLosX' }
  }))
  t.assert(result.data.updateDocument.success)
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
