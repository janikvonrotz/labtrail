const { ApolloServer } = require('apollo-server-micro')
// const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools')
const cors = require('micro-cors')()
const typeDefs = require('./schema')
const resolvers = require('./resolvers')

// Load environment configuration
require('dotenv').config()

// // Mock schema if server is in dev mode
// if(process.env.NODE_ENV == 'development') {

// 	// Make a GraphQL schema with no resolvers
// 	const schema = makeExecutableSchema({ typeDefs: typeDefs })

// 	// Add mocks, modifies schema in place
// 	addMockFunctionsToSchema({ 
// 		schema,
// 		mocks: {
// 			Date: () => {
// 				return new Date()
// 			}
// 		}
// 	})
// }

// Initialize Apollo server
const server = new ApolloServer({
	typeDefs,
	resolvers,
	introspection: true,
	playground: true
})

// Export server as handler
module.exports = cors((req, res) => {

	// Workaround: Abort on Options method otherwise 
    if (req.method === 'OPTIONS') {
		res.end()
		return
    }
    return server.createHandler()(req, res)
})