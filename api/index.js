const { ApolloServer } = require('apollo-server-micro')
const cors = require('micro-cors')()
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const context = require('./context')
const directives = require('./directives')
const { merge } = require('lodash')
const userResolvers = require('./resolvers-user')
const stationResolvers = require('./resolvers-station')
const categoryResolvers = require('./resolvers-category')
const documentResolvers = require('./resolvers-document')
const tenantResolvers = require('./resolvers-tenant')

// Load environment configuration
require('dotenv').config()

// Initialize Apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers: merge(
    resolvers,
    userResolvers,
    stationResolvers,
    documentResolvers,
    categoryResolvers,
    tenantResolvers
  ),
  context: context,
  introspection: true,
  playground: true,
  schemaDirectives: directives
})

// Export server as handler
module.exports = cors((req, res) => {
  // Workaround abort on Options method
  if (req.method === 'OPTIONS') {
    res.end()
    return
  }
  return server.createHandler({ path: '/api' })(req, res)
})
