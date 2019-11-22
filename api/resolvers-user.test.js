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

test.serial('Create tenant: Acme', async t => {
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

test.serial('Create user: User', async t => {
  const CREATE_USER = gql`
  mutation createUser(
    $firstname: String!
    $lastname: String! 
    $email: String!
    $password: String!
    $role: Role!
    $tenant: String!
  ) {
    createUser(
      firstname: $firstname
      lastname: $lastname
      email: $email
      password: $password
      role: $role
      tenant: $tenant
    ) {
      id
    }
  }
  `
  result = merge(result, await mutate({
    mutation: CREATE_USER,
    variables: {
      firstname: 'User',
      lastname: 'LabTrail',
      email: 'user@labtrail.app',
      password: 'userpass',
      role: 'USER',
      tenant: result.data.createTenant.id
    }
  }))
  t.assert(ObjectId.isValid(result.data.createUser.id))
})

test.serial('Get user by Id: User', async t => {
  const GET_USER = gql`
  query user($id: String) {
    user(id: $id) {
      id
      firstname
    }
  }
  `
  result = merge(result, await query({
    query: GET_USER,
    variables: { id: result.data.createUser.id }
  }))
  t.is(result.data.user.firstname, 'User')
})

test.serial('Mutate user: User -> Userx', async t => {
  const UPDATE_USER = gql`
  mutation updateUser(
    $id: String!
    $firstname: String
  ) {
    updateUser(
      id: $id
      firstname: $firstname
    ) {
      success
    }
  }
  `
  result = merge(result, await mutate({
    mutation: UPDATE_USER,
    variables: { id: result.data.createUser.id, firstname: 'UserX' }
  }))
  t.assert(result.data.updateUser.success)
})

test.serial('Login with user: User', async t => {
  const LOGIN_USER = gql`
  query loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
    }
  }
  `
  result = merge(result, await query({
    query: LOGIN_USER,
    variables: { email: 'user@labtrail.app', password: 'userpass' }
  }))
  t.assert(result.data.loginUser.token)
})

test.serial('Delete user by Id: User', async t => {
  const DELETE_USER = gql`
  mutation deleteUser( $id: String!) {
    deleteUser(id: $id) {
      success
    }
  }
  `
  result = merge(result, await mutate({
    mutation: DELETE_USER,
    variables: { id: result.data.createUser.id }
  }))
  t.assert(result.data.deleteUser.success)
})

test.serial('Delete tenant by Id: Acme', async t => {
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
