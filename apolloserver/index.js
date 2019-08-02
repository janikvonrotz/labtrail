const { ApolloServer } = require('apollo-server-micro')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')

// Load environment configuration
require('dotenv').config()

// Initialize Apollo server
const server = new ApolloServer({
	typeDefs,
	resolvers,
	introspection: true,
	playground: true
})

// Export server as handler
module.exports = server.createHandler()
