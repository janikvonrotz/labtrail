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

// Load environment configuration
require('dotenv').config()

test('fetch all tenants', async t => {
  // Initialize Apollo server
  const server = new ApolloServer({
    typeDefs,
    resolvers: merge(
      resolvers,
      userResolvers,
      stationResolvers,
      documentResolvers,
      categoryResolvers,
      tenantResolvers,
      searchResolvers
    ),
    context: () => ({ user: { id: 1, email: 'test@labtrail.now.sh', role: 'ADMIN' } }),
    schemaDirectives: directives
  })

  const { query } = createTestClient(server)

  const GET_TENANTS = gql`
  {
    tenants {
      id
      name
    }
  }
  `

  const res = await query({ query: GET_TENANTS })
  t.is(res.data.tenants.length, 2)
})
