const { ApolloServer } = require('apollo-server-micro')
const cors = require('micro-cors')()
const typeDefs = require('./src/schema')
const resolvers = require('./src/resolvers')
const context = require('./src/context')
const directives = require('./src/directives')
const { merge } = require('lodash')
const userResolvers = require('./src/resolvers-user')
const stationResolvers = require('./src/resolvers-station')
const categoryResolvers = require('./src/resolvers-category')
const documentResolvers = require('./src/resolvers-document')
const tenantResolvers = require('./src/resolvers-tenant')
const searchResolvers = require('./src/resolvers-search')

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
    tenantResolvers,
    searchResolvers
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
